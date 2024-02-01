const { EmbedBuilder } = require('discord.js');

module.exports = function createStaffRolesEmbed(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle('<:y_roles:1197795984844009534> Special Roles')
        .setDescription('All of the possible special roles you can obtain...')
        .addFields(
            { name: '** **', value: '<@&1005955388606263297>\nThis role is given to friends of <@967856657205964870>.', inline: true },
            { name: '** **', value: '<@&1017918188022943804>\nGiven to all the boosters of the server.', inline: true },
            { name: '** **', value: '<@&1196644064192385135>\nGiven to users who vote for <@1005953102454734988> on [Top.gg](https://top.gg/bot/1005953102454734988/vote).', inline: true },
            { name: '** **', value: '<@&1191185520382988388>\nThis role is obtained in <#1005955452594561054>.', inline: true },
            { name: '** **', value: '<@&1197272800206008551>\nObtainable by [subscribing](https://discord.com/channels/1005954362960531578/role-subscriptions) to the server or donating in any way.', inline: true },
            { name: '** **', value: '<@&1005955432063451238>\nGiven to users to allow them into <#1005955468696502272>.', inline: true },
        )
        .setFooter({ text: 'Roles Continued', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();
    return embed;
};