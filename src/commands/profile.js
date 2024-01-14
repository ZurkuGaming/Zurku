// profile.js
const UserData = require('../models/userData.js');
const createProfileEmbed = require('../embeds/profileEmbed.js');

module.exports = {
    data: {
        name: 'profile',
        description: 'Show the user\'s profile',
        category: 'User',
    },
    execute: async (interaction, client) => {
        // Get the UserData document for this user
        const userData = await UserData.findOne({ userID: interaction.user.id });

        if (!userData) {
            return interaction.reply('You do not have a profile yet!');
        }

        // Get the user's display name and profile picture URL
        const displayName = interaction.member.displayName;
        const avatarURL = interaction.user.displayAvatarURL({ format: 'png', dynamic: true });

        // Create the profile embed message
        const embed = createProfileEmbed(userData, displayName, client, avatarURL);

        // Send the embed
        interaction.reply({ embeds: [embed] });
    },
};