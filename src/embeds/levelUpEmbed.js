// levelUpEmbed.js
const { EmbedBuilder } = require('discord.js');

function createLevelUpEmbed(level, client) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle('🚀 Level Up!')
        .setDescription(`Congratulations, you've leveled up to level **${level}**!`)
        .setFooter({ text: 'Level message', iconURL: client.user.displayAvatarURL() })
        .setTimestamp()

    return embed;
}

module.exports = createLevelUpEmbed;