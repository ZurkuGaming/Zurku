const GuildData = require('../models/guildData.js');

module.exports = {
    data: {
        name: 'autorole',
        description: 'Set a role that new guild members receive when they join or remove the auto role.',
        category: 'Server Settings',
        options: [{
            name: 'role',
            description: 'The role to set as the auto role',
            type: 8, 
            required: false // Make this option not required
        }, {
            name: 'remove',
            description: 'Remove the auto role',
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
        const role = interaction.options.get('role')?.role;

        // If the remove option is selected, set the autoRoleID to null
        if (remove) {
            const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (guildData) {
                guildData.autoRoleID = null;
                await guildData.save();
            }
            return interaction.reply({ content: 'Auto role removed.', ephemeral: true });
        }

        // If a role is selected, set the autoRoleID to the role's ID
        if (role) {
            const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (!guildData) {
                const newGuildData = new GuildData({
                    guildID: interaction.guild.id,
                    autoRoleID: role.id
                });
                await newGuildData.save();
                await interaction.reply({ content: `Auto role set to ${role.name}`, ephemeral: true });
            } else {
                guildData.autoRoleID = role.id;
                await guildData.save();
                await interaction.reply({ content: `Auto role updated to ${role.name}`, ephemeral: true });
            }
        }
    },
};