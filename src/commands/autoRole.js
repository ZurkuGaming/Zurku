const { CommandInteraction, MessageEmbed } = require('discord.js');
const GuildData = require('../models/guildData.js');

module.exports = {
    data: {
        name: 'autorole',
        description: 'Set a role to be automatically assigned to new members.',
        options: [{
            name: 'role',
            type: 8, 
            description: 'The role to assign to new members.',
            required: true,
        }],
    },
    async execute(interaction = new CommandInteraction()) {
        // Ensure the command was issued by an admin
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You must be an admin to use this command.');
        }

        const joinRole = interaction.options.getRole('role');

        // Update the guild's join role ID
        GuildData.findOneAndUpdate(
            { guildID: interaction.guild.id },
            { joinRoleID: joinRole.id },
            { upsert: true, new: true, setDefaultsOnInsert: true },
            (error) => {
                if (error) {
                    console.error(error);
                    interaction.reply('There was an error setting the join role.');
                } else {
                    interaction.reply(`Successfully set the join role to ${joinRole.name}.`);
                }
            }
        );
    },
};