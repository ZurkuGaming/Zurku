const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const createLevelBoardEmbed = require('../embeds/levelBoardEmbed');
const createServerLevelBoardEmbed = require('../embeds/serverBoardEmbed');

module.exports = {
    data: {
        name: 'leaderboard',
        description: 'Shows the leaderboard',
        category: 'User Profile',
        options: [
            {
                name: 'global',
                description: 'Shows the global leaderboard',
                type: 1,
            },
            {
                name: 'server',
                description: 'Shows the server leaderboard',
                type: 1,
            },
        ],
    },
    async execute(interaction, client) {
        // This should be the user who used the command
        const commandUser = interaction.user;

        // Check which subcommand was used
        const subCommand = interaction.options.getSubcommand();
        if (subCommand === 'server') {
            // Create the server level embed
            const serverLevelEmbed = await createServerLevelBoardEmbed(client, commandUser, interaction.guild.id);

            // Send the message
            await interaction.reply({ embeds: [serverLevelEmbed] });
        } else if (subCommand === 'global') {
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
        }
    },
};