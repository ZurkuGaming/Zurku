const createRulesEmbed = require('../embeds/rulesEmbed');
const createStaffRolesEmbed = require('../embeds/staffRolesEmbed');
const createCommandsEmbed = require('../embeds/commandsEmbed');
const createLevelRolesEmbed = require('../embeds/levelRolesEmbed');
const createSpecialRolesEmbed = require('../embeds/specialRolesEmbed');

module.exports = function handleWebhookInteraction(client) {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;

        let embed;
        switch (interaction.customId) {
            case 'rules':
                embed = createRulesEmbed(interaction);
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
            case 'roles':
                const staffRolesEmbed = createStaffRolesEmbed(interaction);
                const levelRolesEmbed = createLevelRolesEmbed(interaction);
                const specialRolesEmbed = createSpecialRolesEmbed(interaction);
                await interaction.reply({ embeds: [staffRolesEmbed, levelRolesEmbed, specialRolesEmbed], ephemeral: true });
                break;
            case 'commands':
                embed = createCommandsEmbed(interaction);
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
            default:
                return;
        }
    });
};