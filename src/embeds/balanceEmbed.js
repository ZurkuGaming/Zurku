// balanceEmbed.js
const { EmbedBuilder } = require('discord.js');

module.exports = (user, stellar, starShards, displayName, client) => {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`<:bankIcon:1198818038393356349> ${displayName}'s Balance`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            { 
                name: '<:stellerIcon:1198818044546387979> Stellar', 
                value: stellar.toString(),
                inline: true 
            },
            { 
                name: '<:starShardsIcon:1198818040419205162> Star Shards', 
                value: starShards.toString(),
                inline: true 
            }
        )
        .setFooter({ text: 'Balance command', iconURL: client.user.displayAvatarURL() }) 
        .setTimestamp();

    return embed;
};