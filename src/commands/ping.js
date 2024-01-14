// ping.js
const createPingEmbed = require('../embeds/pingEmbed');

module.exports = {
    data: {
        name: 'ping',
        description: 'Ping the bot and get its uptime',
        category: 'Utility',
    },
    execute(interaction) {
        try {
            const client = interaction.client;
            if (!client) {
                console.error('Client is not defined');
                return;
            }
    
            const botUptime = Math.round(client.uptime / 1000); // Convert from milliseconds to seconds
            if (client.ws) {
                const embed = createPingEmbed(botUptime, client.ws.ping, client);
                interaction.reply({ embeds: [embed] });
            } else {
                console.error('Client.ws is undefined');
            }
        } catch (error) {
            console.error(`Error executing ping command: ${error}`);
        }
    }
}