// Zurku/src/commands/leveldm.js
const UserData = require('../models/userData.js');

module.exports = {
  data: {
    name: 'leveldm',
    description: 'Toggle level up DMs',
    category: 'User Profile',
    options: [
      {
        name: 'state',
        type: 5,
        description: 'Whether to turn level up DMs on or off',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    // Get the user's UserData document
    let userData = await UserData.findOne({ userID: interaction.user.id });

    // If the user doesn't have a UserData document, create one
    if (!userData) {
      userData = new UserData({ userID: interaction.user.id });
      await userData.save();
    }

    // Set the dms field to the value of the state option
    userData.dms = interaction.options.getBoolean('state');

    // Save the updated UserData document
    await userData.save();

    // Send a confirmation message
    await interaction.reply(`Level up DMs have been turned ${userData.dms ? 'on' : 'off'}.`);
  },
};