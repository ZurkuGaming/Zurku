// begEmbed.js
const { EmbedBuilder } = require('discord.js');

const generateBegEmbed = (stellarReceived, successfulResponses, unsuccessfulResponses, client) => {
    const embed = new EmbedBuilder();

    if (stellarReceived > 0) {
        // Successful beg
        const response = successfulResponses[Math.floor(Math.random() * successfulResponses.length)];
        embed.setTitle(' 🙏 Beg Successful!')
            .setColor('#00FF00') // Green
            .setDescription(response);
    } else {
        // Unsuccessful beg
        const response = unsuccessfulResponses[Math.floor(Math.random() * unsuccessfulResponses.length)];
        embed.setTitle(' 🙏 Beg Unsuccessful!')
            .setColor('#FF0000') // Red
            .setDescription(response);
    }

    embed.setFooter({ text: 'Beg command', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    return embed;
};

module.exports = generateBegEmbed;