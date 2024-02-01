const { EmbedBuilder } = require('discord.js');

module.exports = function createStaffRolesEmbed(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle('<:y_roles:1197795984844009534> Level Roles')
        .setDescription('All of the possible level roles you can obtain...')
        .addFields(
            { name: '** **', value: '<@&1198060241548492951>\n• Add reactions\n• Change Nickname', inline: true },
            { name: '** **', value: '<@&1198060250058723368>\n• Send Links and Files\n• Use Soundboard', inline: true },
            { name: '** **', value: '<@&1198060236079112262>\n• Use External Sounds\n• Use External Stickers', inline: true },
            { name: '** **', value: '<@&1198060246954934412>\n• People will think you are super cool <:m_Copium:1197261018737410120>', inline: true },
            { name: '** **', value: '<@&1198060243775664248>\n• You\'ll get all the anime girls <:m_Copium:1197261018737410120>', inline: true },
            { name: '** **', value: '<@&1198060238595706971>\n• All the clout you could ever want <:m_Copium:1197261018737410120>', inline: true },
        )
        .setFooter({ text: 'Roles Continued', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();
    return embed;
};