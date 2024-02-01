// Import the UserData model
const UserData = require('../models/userData.js');

module.exports = {
  data: {
    name: 'bio',
    description: 'Set your bio',
    category: 'User Profile',
    options: [
      {
        name: 'bio',
        description: 'Your new bio',
        type: 3,
        required: true
      }
    ]
  },
  async execute(interaction) {
    const bio = interaction.options.getString('bio');

    // Defer the reply
    await interaction.deferReply({ ephemeral: true });

    // Get or create a UserData document for this user
    let userData;
    try {
      userData = await UserData.findOne({ userID: interaction.user.id });
      if (!userData) {
        userData = new UserData({ userID: interaction.user.id, bio: bio });
        await userData.save();
      }
    } catch (error) {
      return;
    }

    // Update the user's bio
    userData.bio = bio;

    // Save the UserData document
    try {
      await userData.save();
      // Edit the deferred reply
      await interaction.editReply({ content: `Bio successfully updated to: ${bio}` });
    } catch (error) {
      console.error('Error saving user data: ', error);
      // Edit the deferred reply in case of error
      await interaction.editReply({ content: 'There was an error updating your bio.' });
    }
  },
};