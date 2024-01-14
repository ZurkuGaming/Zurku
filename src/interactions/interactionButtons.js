// interactions/interactionButtons.js
const createMessageBoardEmbed = require('../embeds/messageBoardEmbed');
const createRepBoardEmbed = require('../embeds/repBoardEmbed');
const createLevelBoardEmbed = require('../embeds/levelBoardEmbed');

module.exports = function handleButtonInteraction(client) {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;

        const commandUser = interaction.user;
        let newEmbed;
        switch (interaction.customId) {
            case 'repBoard':
                newEmbed = await createRepBoardEmbed(client, commandUser);
                break;
            case 'levelBoard':
                newEmbed = await createLevelBoardEmbed(client, commandUser);
                break;
            case 'messageBoard':
                newEmbed = await createMessageBoardEmbed(client, commandUser);
                break;
            default:
                console.log('Unexpected interaction.customId:', interaction.customId);
                return;
        }

        // Log the newEmbed object
        console.log(newEmbed);

        try {
            await interaction.update({ embeds: [newEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this button interaction!', ephemeral: true });
        }
    });
};