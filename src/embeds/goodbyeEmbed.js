const { EmbedBuilder } = require('discord.js');

module.exports = function createGoodbyeEmbed(member) {
    return new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle(`👤 Goodbye ${member.user.username}!`)
        .setDescription('We\'re sad to see you go, kojishiro. We hope to see you again soon!')
        .addFields(
            { name: 'Left at', value: new Date().toLocaleString(), inline: false },
            { name: 'Total members', value: member.guild.memberCount.toString(), inline: false }
          )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `User ID: ${member.user.id}` })
        .setTimestamp();
}