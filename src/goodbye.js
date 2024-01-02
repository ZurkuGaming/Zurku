const { EmbedBuilder } = require('discord.js');

function sendGoodbyeEmbed(channel, member) {
    const guildName = member.guild ? member.guild.name : 'Unknown Server';

    const goodbyeEmbed = new EmbedBuilder({
        title: `Goodbye from ${guildName}!`,
        description: `We'll miss you, ${member.displayName}!`,
        color: 0xff0000, 
        fields: [
            { name: 'Account Created On', value: member.user.createdAt.toDateString(), inline: true },
            { name: 'Total Members', value: member.guild ? member.guild.memberCount : 0, inline: true },
        ],
    });

    channel.send({ embeds: [goodbyeEmbed] });
}

module.exports = {
    sendGoodbyeEmbed,
};