const { EmbedBuilder } = require('discord.js');
const ServerUserData = require('../models/serverUserData');

module.exports = async function createServerLevelBoardEmbed(client, commandUser, guildId) {
    if (!client || !client.users) throw new Error('Invalid client object');
    if (!commandUser || !commandUser.id) throw new Error('Invalid commandUser object');

    const users = await ServerUserData.find({ guildID: guildId }).sort('-serverLevel');
    const position = users.findIndex(user => user.userID === commandUser.id) + 1;
    const topUsers = users.slice(0, 10);

    const embed = new EmbedBuilder()
        .setTitle('<:levelsIcon:1198822606380482611> Server Level Leaderboard')
        .setColor('#050505')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: 'Server Level Rankings', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    const descriptionPromises = topUsers.map(async (user, index) => {
        const discordUser = await client.users.fetch(user.userID);
        return `**${index + 1}. \`${discordUser.username}\`** (Level: ${user.serverLevel})`;
    });
    const description = (await Promise.all(descriptionPromises)).join('\n');
    embed.setDescription(description);

    if (position !== 0) embed.addFields({ name: 'Your Position', value: `#${position}` });

    return embed;
};