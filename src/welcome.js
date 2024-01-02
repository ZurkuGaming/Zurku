const { EmbedBuilder } = require('discord.js');

function sendWelcomeEmbed(channel, member, inviter) {
    const guildName = member.guild ? member.guild.name : 'Unknown Server';

    const welcomeEmbed = new EmbedBuilder({
        title: `Welcome to ${guildName}!`,
        description: `Thanks for joining our community, ${member.displayName}!`,
        color: 0x008000, 
        fields: [
            { name: 'Account Created On', value: member.user.createdAt.toDateString(), inline: true },
            { name: 'Invited by', value: inviter ? inviter.tag : 'Unknown', inline: true },
            { name: 'Total Members', value: member.guild ? member.guild.memberCount : 0, inline: true },
        ],
    });

    channel.send({ embeds: [welcomeEmbed] });
}

module.exports = {
    sendWelcomeEmbed,
};