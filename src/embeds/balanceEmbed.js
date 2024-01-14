// balanceEmbed.js
const { EmbedBuilder } = require('discord.js');

module.exports = (user, stellar, starShards, displayName, client) => {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`🏦 ${displayName}'s Balance`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            { 
                name: '💠 Stellar', 
                value: stellar.toString(),
                inline: true 
            },
            { 
                name: '💫 Star Shards', 
                value: starShards.toString(),
                inline: true 
            }
        )
        .setFooter({ text: 'Balance command', iconURL: client.user.displayAvatarURL() }) 
        .setTimestamp();

    return embed;
};