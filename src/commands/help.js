const helpEmbed = require('../embeds/helpEmbed');

module.exports = {
    data: {
        name: 'help',
        description: 'List all commands',
        category: 'Utility',
    },
    execute(interaction) {
        let commands = Array.from(interaction.client.commands.values());
        interaction.reply({ embeds: [helpEmbed(commands, interaction.client)] }); 
    }
};