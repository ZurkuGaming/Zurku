// profileEmbed.js
const { EmbedBuilder } = require('discord.js');
const { createXPProgressBar } = require('../utils/progressBar.js'); 

function createProfileEmbed(userData, displayName, client, avatarURL) {
    // Create the XP progress bar
    const xpProgressBar = createXPProgressBar(userData);

    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`<:profileIcon:1198857853583237141> ${displayName}'s Global Profile`)
        .setThumbnail(avatarURL)
        .setDescription(`<:bioIcon:1198857852723409026> **About Me:** ${userData.bio || 'No bio set'}`)
        .addFields(
            { 
                name: '<:xpIcon:1198854751832506479> XP Progress', 
                value: `${userData.xp.toFixed(1)}/${userData.xpRequired}\n${xpProgressBar}`,
                inline: false 
            }, 
            { name: '<:levelsIcon:1198822606380482611> Level', value: userData.level.toString(), inline: true },
            { name: '<:messageIcon:1198841543994376272> Messages', value: userData.messageCount.toString(), inline: true }, 
            { name: '<:repIcon:1198843435218636830> Reputation', value: userData.rep.toString(), inline: true },
        )
        .setFooter({ text: 'Profile command', iconURL: client.user.displayAvatarURL() }) 
        .setTimestamp();

    return embed;
}

module.exports = createProfileEmbed;