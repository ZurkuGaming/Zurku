// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
    data: {
        name: 'bump',
        description: 'Set the bump channel and role or remove them.',
        category: 'Server Settings',
        options: [{
            name: 'channel',
            description: 'The channel where you bump the server',
            type: 7, 
            required: false // Make this option not required
        }, {
            name: 'role',
            description: 'The role to remind when the server can be bumped',
            type: 8, 
            required: false // Make this option not required
        }, {
            name: 'remove',
            description: 'Remove the bump channel and role',
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
        const role = interaction.options.get('role')?.role;

        // If the remove option is selected, set the bumpChannelID and bumpRoleID to null
        if (remove) {
            const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (guildData) {
                guildData.bumpChannelID = null;
                guildData.bumpRoleID = null;
                await guildData.save();
            }
            return interaction.reply({ content: 'Bump channel and role removed.', ephemeral: true });
        }

        // If only a channel or only a role is selected, ask the user to provide both
        if ((channel && !role) || (!channel && role)) {
            return interaction.reply({ content: 'Please provide both a channel and a role.', ephemeral: true });
        }

        // If a channel and role are selected, set the bumpChannelID and bumpRoleID to the channel's and role's ID
        if (channel && role) {
            const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (!guildData) {
                const newGuildData = new GuildData({
                    guildID: interaction.guild.id,
                    bumpChannelID: channel.id,
                    bumpRoleID: role.id
                });
                await newGuildData.save();
                await interaction.reply({ content: `Bump channel set to ${channel.name} and bump role set to ${role.name}`, ephemeral: true });
            } else {
                guildData.bumpChannelID = channel.id;
                guildData.bumpRoleID = role.id;
                await guildData.save();
                await interaction.reply({ content: `Bump channel updated to ${channel.name} and bump role updated to ${role.name}`, ephemeral: true });
            }
        }
    },
};