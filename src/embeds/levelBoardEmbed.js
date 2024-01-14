const { EmbedBuilder } = require('discord.js');
const UserData = require('../models/userData');

module.exports = async function createLevelBoardEmbed(client, commandUser) {
    if (!client || !client.users) {
        throw new Error('Invalid client object');
    }
    if (!commandUser || !commandUser.id) {
        throw new Error('Invalid commandUser object');
    }

    // Fetch all users from the database
    const users = await UserData.find().sort('-level');

    // Find the position of the user who used the command
    const position = users.findIndex(user => user.userID === commandUser.id) + 1;

    // Fetch the top 10 users by level
    const topUsers = users.slice(0, 10);

    // Create the embed
    const embed = new EmbedBuilder()
        .setTitle('🌐 Level Leaderboard')
        .setColor('#050505')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            text: 'Level Rankings',
            iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp();

    // Add the users to the description
    const descriptionPromises = topUsers.map(async (user, index) => {
        const discordUser = await client.users.fetch(user.userID);
        return `**${index + 1}.** <@${discordUser.id}> - Level: **${user.level}**`;
    });
    const description = (await Promise.all(descriptionPromises)).join('\n');
    embed.setDescription(description);

// Add the user's position to the embed
if (position !== 0) {
    embed.addFields({ name: 'Your Position', value: `#${position}` });
}

    return embed;
};