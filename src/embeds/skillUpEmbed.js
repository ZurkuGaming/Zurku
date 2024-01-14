// skillUpEmbed.js
const { EmbedBuilder } = require('discord.js');

function skillUpEmbed(level, type, client) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`${type.charAt(0).toUpperCase() + type.slice(1)} Level Up!`)
        .setDescription(`Congratulations, your ${type} skill has leveled up to level ${level}!`)
        .setFooter({ text: 'Skill message', iconURL: client.user.displayAvatarURL() })
        .setTimestamp()

    return embed;
}

module.exports = skillUpEmbed;