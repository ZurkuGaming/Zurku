// src/embeds/avatarEmbed.js
const { EmbedBuilder } = require('discord.js');

module.exports = function createAvatarEmbed(user, client) {
    const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });
    return new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`${user.tag}'s avatar`)
        .setURL(avatarUrl)
        .setImage(avatarUrl)
        .setFooter({ text: 'Avatar command', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();
}