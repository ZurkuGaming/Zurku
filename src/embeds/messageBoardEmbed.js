const { EmbedBuilder } = require('discord.js');
const UserData = require('../models/userData');

module.exports = async function createMessageBoardEmbed(client, commandUser) {
    if (!client || !client.users) {
        throw new Error('Invalid client object');
    }
    if (!commandUser || !commandUser.id) {
        throw new Error('Invalid commandUser object');
    }

    // Fetch all users from the database
    const users = await UserData.find().sort('-messageCount');

    // Find the position of the user who used the command
    const position = users.findIndex(user => user.userID === commandUser.id) + 1;

    // Fetch the top 10 users by message count
    const topUsers = users.slice(0, 10);

    // Create the embed
    const embed = new EmbedBuilder()
        .setTitle('💬 Message Leaderboard')
        .setColor('#050505')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            text: 'Message Rankings',
            iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp();

    // Add the users to the description
    const descriptionPromises = topUsers.map(async (user, index) => {
        const discordUser = await client.users.fetch(user.userID);
        return `**${index + 1}.** <@${discordUser.id}> - Messages: **${user.messageCount}**`;
    });
    const description = (await Promise.all(descriptionPromises)).join('\n');
    embed.setDescription(description);

// Add the user's position to the embed
if (position !== 0) {
    embed.addFields({ name: 'Your Position', value: `#${position}` });
}

    return embed;
};