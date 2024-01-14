const { EmbedBuilder } = require('discord.js');

module.exports = function createWelcomeEmbed(member) {
    return new EmbedBuilder()
        .setColor('#008000')
        .setTitle(`👤 Welcome ${member.user.username}!`)
        .setDescription(`We\'re glad to have you here, ${member.user.username}! Enjoy your stay.`)
        .addFields(
            { name: 'Joined at', value: member.joinedAt.toLocaleString(), inline: false },
            { name: 'Total members', value: member.guild.memberCount.toString(), inline: false }
          )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `User ID: ${member.user.id}` })
        .setTimestamp();
}