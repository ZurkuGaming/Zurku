// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
    data: {
        name: 'welcome',
        description: 'Set the welcome channel or remove it.',
        category: 'Server Settings',
        options: [{
            name: 'channel',
            description: 'The channel to set as the welcome channel',
            type: 7, 
            required: false // Make this option not required
        }, {
            name: 'remove',
            description: 'Remove the welcome channel',
            type: 5, // Boolean type
            required: false
        }],
    },
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const remove = interaction.options.get('remove')?.value;
        const channel = interaction.options.get('channel')?.channel;

        // If the remove option is selected, set the welcomeChannelID to null
        if (remove) {
            const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (guildData) {
                guildData.welcomeChannelID = null;
                await guildData.save();
            }
            return interaction.reply({ content: 'Welcome channel removed.', ephemeral: true });
        }

        // If a channel is selected, set the welcomeChannelID to the channel's ID
        if (channel) {
            const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (!guildData) {
                const newGuildData = new GuildData({
                    guildID: interaction.guild.id,
                    welcomeChannelID: channel.id
                });
                await newGuildData.save();
                await interaction.reply({ content: `Welcome channel set to ${channel.name}`, ephemeral: true });
            } else {
                guildData.welcomeChannelID = channel.id;
                await guildData.save();
                await interaction.reply({ content: `Welcome channel updated to ${channel.name}`, ephemeral: true });
            }
        }
    },
};