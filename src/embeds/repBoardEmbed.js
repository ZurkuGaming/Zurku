const { EmbedBuilder } = require('discord.js');
const UserData = require('../models/userData');

module.exports = async function createRepBoardEmbed(client, commandUser) {
    if (!client || !client.users) throw new Error('Invalid client object');
    if (!commandUser || !commandUser.id) throw new Error('Invalid commandUser object');

    const users = await UserData.find().sort('-rep');
    const position = users.findIndex(user => user.userID === commandUser.id) + 1;
    const topUsers = users.slice(0, 10);

    const embed = new EmbedBuilder()
        .setTitle('<:repIcon:1198843435218636830> Global Reputation Leaderboard')
        .setColor('#050505')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: 'Reputation Rankings', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    const descriptionPromises = topUsers.map(async (user, index) => {
        const discordUser = await client.users.fetch(user.userID);
        return `**${index + 1}. \`${discordUser.username}\`** (Rep: ${user.rep})`;
    });
    const description = (await Promise.all(descriptionPromises)).join('\n');
    embed.setDescription(description);

    if (position !== 0) embed.addFields({ name: 'Your Position', value: `#${position}` });

    return embed;
};
