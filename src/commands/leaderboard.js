const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const createLevelBoardEmbed = require('../embeds/levelBoardEmbed');

module.exports = {
    data: {
        name: 'leaderboard',
        description: 'Shows the leaderboard',
        category: 'User',
    },
    async execute(interaction, client) {
        // This should be the user who used the command
        const commandUser = interaction.user;

        // Create the embed
        const levelEmbed = await createLevelBoardEmbed(client, commandUser);

        // Create the buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('levelBoard')
                    .setLabel('Levels')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('messageBoard')
                    .setLabel('Messages')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('repBoard')
                    .setLabel('Reputation')
                    .setStyle('Success')
            );

        // Send the message
        await interaction.reply({ embeds: [levelEmbed], components: [row] });
    },
};