// src/commands/rep.js
const UserData = require('../models/userData.js');

module.exports = {
  data: {
    name: 'rep',
    description: 'Give a reputation point to a user',
    category: 'User Profile',
    options: [
      {
        name: 'user',
        type: 6, 
        description: 'The user you want to give a reputation point to',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const targetUserData = await UserData.findOne({ userID: targetUser.id });
    const sourceUserData = await UserData.findOne({ userID: interaction.user.id });

    // Check if the target user is the same as the user who invoked the command
    if (targetUser.id === interaction.user.id) {
      return interaction.reply({ content: 'You cannot give a reputation point to yourself.', ephemeral: true });
    }
  
    // Check if the target user is a bot
    if (targetUser.bot) {
      return interaction.reply({ content: 'You cannot give a reputation point to a bot.', ephemeral: true });
    }

    if (!targetUserData) {
      targetUserData = new UserData({ userID: targetUser.id });
      await targetUserData.save();
    }

    if (!sourceUserData) {
      sourceUserData = new UserData({ userID: interaction.user.id });
      await sourceUserData.save();
    }

    const now = new Date();
    const lastRepDate = sourceUserData.lastRepDate;

    if (lastRepDate && (now - lastRepDate) < 24 * 60 * 60 * 1000) {
      return interaction.reply({ content: 'You can only give a reputation point once per day.', ephemeral: true });
    }

    targetUserData.rep += 1;
    sourceUserData.lastRepDate = now;

    await targetUserData.save();
    await sourceUserData.save();

    interaction.reply(`You gave a reputation point to <@${targetUser.id}>. They now have ${targetUserData.rep} reputation points.`);
  },
};