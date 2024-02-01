const { EmbedBuilder } = require('discord.js');

module.exports = function createStaffRolesEmbed(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle('<:y_roles:1197795984844009534> Staff Roles')
        .setDescription('All of the possible staff roles you can obtain...')
        .addFields(
            { name: '** **', value: '<@&1005955379211018281>\nOwner of Zurku Bot and Server.', inline: true },
            { name: '** **', value: '<@&1196648679189258313>\nZurku Bot developers and contributors.', inline: true },
            { name: '** **', value: '<@&1005955382469996584>\nManager/s of the Zurku Discord.', inline: true },
            { name: '** **', value: '<@&1005955380058271806>\nGiven to admins of the Zurku Discord.', inline: true },
            { name: '** **', value: '<@&1005955381132021843>\nGiven to moderators of the Zurku Discord.', inline: true },
            { name: '** **', value: '<@&1005955383476625408>\nGiven to all staff members.', inline: true },
        )
        .setFooter({ text: 'Roles Info', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();
    return embed;
};