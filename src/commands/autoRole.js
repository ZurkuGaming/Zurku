// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
    data: {
        name: 'autorole',
        description: 'Set the role to be automatically assigned to new members.',
        category: 'Settings',
        options: [{
            name: 'role',
            type: 8, // Role type
            description: 'The role to assign to new members.',
            required: true,
        }],
    },
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const role = interaction.options.get('role').role;

        // Set the join role
        const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
        if (!guildData) {
            // If no data for the guild was found, create a new document
            const newGuildData = new GuildData({
                guildID: interaction.guild.id,
                joinRoleID: role.id,
            });
            await newGuildData.save();
        } else {
            // If data for the guild was found, update the document
            guildData.joinRoleID = role.id;
            await guildData.save();
        }

        await interaction.reply({ content: `Join role set to ${role.name}`, ephemeral: true });
    },
};