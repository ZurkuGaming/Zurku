const { EmbedBuilder } = require('discord.js');

module.exports = function createCommandsEmbed(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle('<:y_commands:1197795982671360020> Commands')
        .setDescription('Here are the commands some of the important commands...')
        .addFields(
            { name: '/help', value: 'Shows all of the commands and info about them.' },
            { name: '/welcome', value: 'Set a welcome channel where welcome messages will be sent.' },
            { name: '/goodbye', value: 'Set a goodbye channel where goodbye messages will be sent.' },
            { name: '/bump', value: 'Bump reminder that allows you to set a channel and role to remind.' },
            { name: '/autorole', value: 'Set a role to give new users to.' },
            { name: '/leaderboard', value: 'Check the global leaderboards to see where you and other users are placed.' },
            { name: '/profile', value: 'Used to check your profile stats.' },
            { name: '/bio', value: 'Set a bio that will show up on your profile.' },
            { name: '/avatar', value: 'Used to check you or another user\'s profile picture.' },
            { name: '/ping', value: 'Checks how long the bot has been online and the connection of the bot.' },
        )
        .setFooter({ text: 'Commands Info', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();
    return embed;
};