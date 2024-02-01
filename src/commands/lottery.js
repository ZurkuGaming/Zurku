// src/commands/lottery.js
const LotteryData = require('../models/lotteryData.js');
const UserData = require('../models/userData.js');
const lotteryDraw = require('../events/lotteryDraw.js');
const lotteryEmbed = require('../embeds/lotteryEmbed.js');

module.exports = {
  data: {
    name: 'lottery',
    description: 'Participate in the lottery',
    category: 'Economy',
    options: [
      {
        name: 'buy',
        type: 1,
        description: 'Buy a lottery ticket',
        options: [
          {
            name: 'number',
            type: 4, // INTEGER type
            description: 'Number of tickets to buy',
            required: true,
          },
        ],
      },
      {
        name: 'view',
        type: 1,
        description: 'View the current lottery',
      },
    ],
  },
  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    let lotteryData;
    let userData = await UserData.findOne({ userID: interaction.user.id });

    switch (subCommand) {
      case 'buy':
        const number = interaction.options.getInteger('number'); // Get the number of tickets to buy
        const cost = 100 * number; // Calculate the total cost

        // Fetch lottery data
        lotteryData = await LotteryData.findOne({});

        // Check if user has enough stellar to buy the specified number of tickets
        if (userData.stellar < cost) {
          return interaction.reply(`You do not have enough stellar to buy ${number} lottery tickets.`);
        }

        // Deduct stellar from user
        userData.stellar -= cost;
        await userData.save();

        // Add user to lottery
        lotteryData = await LotteryData.findOne({});
        if (!lotteryData) {
          lotteryData = new LotteryData();
        }
        for (let i = 0; i < number; i++) {
          lotteryData.participants.push(interaction.user.id);
        }

        // Schedule lottery draw 60 seconds after the first ticket is bought
        if (lotteryData.participants.length === number) { // This is the first ticket
          const endTime = Date.now() + 60000; // 60 seconds from now
          lotteryData.endTime = endTime;
          setTimeout(() => lotteryDraw(client), endTime - Date.now());
        }

        await lotteryData.save();

        return interaction.reply(`You have bought ${number} lottery tickets for ${cost} stellar. You now have ${lotteryData.participants.filter(id => id === interaction.user.id).length} tickets.`);

        case 'view':
          // Fetch lottery data
          lotteryData = await LotteryData.findOne({});
        
          // Check if lottery exists
          if (!lotteryData || !lotteryData.participants) {
            return interaction.reply('No lottery is currently running.');
          }
        
          // Check if there are any participants
          if (lotteryData.participants.length === 0) {
            return interaction.reply({ content: 'The lottery hasn\'t begun. Use /lottery buy to start a new lottery.', ephemeral: true });
          }
        
          // Get the number of tickets the user has
          const userTickets = lotteryData.participants.filter(id => id === interaction.user.id).length;
        
          // Calculate prize pool, win percentage, and time left
          const prizePool = lotteryData.participants.length * 100; // Assuming each ticket costs 100 stellar
          let winPercentage = (userTickets / lotteryData.participants.length) * 100;
          winPercentage = winPercentage.toFixed(1); // Format to one decimal place
          const timeLeft = Math.round((lotteryData.endTime - Date.now()) / 1000); // Convert to seconds
        
          // Generate the embed
          const embed = lotteryEmbed(userTickets, lotteryData, prizePool, winPercentage, timeLeft, client); // Pass client as a parameter
        
          // Reply with the embed
          return interaction.reply({ embeds: [embed] });
      }
    },
  };

// When the bot starts, check if there's an ongoing lottery
(async () => {
  const ongoingLotteryData = await LotteryData.findOne({});
  if (ongoingLotteryData && ongoingLotteryData.endTime && ongoingLotteryData.endTime > Date.now()) {
    // If there's an ongoing lottery, schedule the lottery draw based on the saved end time
    setTimeout(lotteryDraw, ongoingLotteryData.endTime - Date.now());
  }
})();