// src/events/lotteryDraw.js
const LotteryData = require('../models/lotteryData.js');
const UserData = require('../models/userData.js');

const lotteryDraw = async (client) => { // Add client as a parameter
  const lotteryData = await LotteryData.findOne({});
  if (lotteryData.participants.length > 0) {
    const winnerIndex = Math.floor(Math.random() * lotteryData.participants.length);
    const winnerId = lotteryData.participants[winnerIndex];

    // Fetch the winner's user data
    const winnerData = await UserData.findOne({ userID: winnerId });

    // Add the total prize to the winner's stellar
    const totalPrize = lotteryData.participants.length * 100; // Assuming each ticket costs 100 stellar
    winnerData.stellar += totalPrize;
    await winnerData.save();

    // Fetch the winner's User object and send a DM
    const winnerUser = await client.users.fetch(winnerId);
    await winnerUser.send(`Congratulations! You won the lottery and received ${totalPrize} stellar!`);

    // TODO: Announce the winner and their prize
  }

  // Reset the lottery
  lotteryData.participants = [];
  lotteryData.endTime = null; // Reset the end time
  await lotteryData.save();
};

module.exports = lotteryDraw;