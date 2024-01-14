// Import the GuildData model
const GuildData = require('../models/guildData.js');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: {
        name: 'autorole',
        description: 'Configure your auto-role for this server.',
        category: 'Settings',
        options: [{
            name: 'role',
            type: ApplicationCommandOptionType.Role,
            description: 'The role you want users to get on join.',
            required: true,
        }],
        permissionsRequired: [PermissionFlagsBits.Administrator],
        botPermissions: [PermissionFlagsBits.ManageRoles],
    },
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const targetRoleId = interaction.options.get('role').value;

        // Set the join role
        let guildData = await GuildData.findOne({ guildID: interaction.guild.id });
        if (!guildData) {
            // If no data for the guild was found, create a new document
            guildData = new GuildData({
                guildID: interaction.guild.id,
                joinRoleID: targetRoleId,
            });
        } else {
            // If data for the guild was found, update the document
            if (guildData.joinRoleID === targetRoleId) {
                return interaction.reply('Auto role has already been configured for that role. To disable run `/autorole-disable`');
            }
            guildData.joinRoleID = targetRoleId;
        }

        await guildData.save();
        await interaction.reply('Autorole has now been configured. To disable run `/autorole-disable`');
    },
};