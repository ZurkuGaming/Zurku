// profile.js
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const UserData = require('../models/userData.js');
const createProfileEmbed = require('../embeds/profileEmbed.js');

module.exports = {
    data: {
        name: 'profile',
        description: 'Show the user\'s profile',
        category: 'User Profile',
        options: [{
            name: 'username',
            type: 3,
            description: 'The username of the user whose profile you want to view',
            required: false,
        }, {
            name: 'user',
            type: 6,
            description: 'The user whose profile you want to view',
            required: false,
        }],
    },
    execute: async (interaction, client) => {
        // Get the username or user from the command options, or use the user who issued the command
        const username = interaction.options.getString('username');
        const user = interaction.options.getUser('user') || interaction.user;

        // Get the UserData document for this user
        const userData = await UserData.findOne({ username: username || user.username });

        if (!userData) {
            return interaction.reply('That user does not have a profile yet!');
        }

        // Get the user's display name and profile picture URL
        const displayName = userData.username;
        const profileUser = await client.users.fetch(userData.userID); // Fetch the user whose profile is being viewed
        const avatarURL = profileUser.displayAvatarURL({ format: 'png', dynamic: true }); // Get the avatarURL from the profileUser

        // Create the profile embed message
        const embed = createProfileEmbed(userData, displayName, client, avatarURL);

        // Create the buttons with the user ID in the custom ID
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`globalProfile:${userData.userID}`) // Use the ID of the user whose profile is being displayed
                .setLabel('Global Profile')
                .setStyle('Secondary'),
            new ButtonBuilder()
                .setCustomId(`serverProfile:${userData.userID}`) // Use the ID of the user whose profile is being displayed
                .setLabel('Server Profile')
                .setStyle('Primary'),
        );

        // Send the embed with the buttons
        interaction.reply({ embeds: [embed], components: [row] });
    },
};