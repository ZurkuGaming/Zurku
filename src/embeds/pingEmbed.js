// embeds/pingEmbed.js
const { EmbedBuilder } = require('discord.js');

module.exports = function createPingEmbed(botUptime, ping, client) {
    return new EmbedBuilder()
        .setColor('#050505')
        .setTitle('🏓 Pong!')
        .setDescription(`🕒 The bot has been online for ${botUptime} seconds. 📡 The bot's ping is ${ping}ms.`)
        .setFooter({ text: 'Ping Command', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();
}