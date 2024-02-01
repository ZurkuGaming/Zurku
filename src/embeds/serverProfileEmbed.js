// serverProfileEmbed.js
const { EmbedBuilder } = require('discord.js');
const { createXPProgressBar } = require('../utils/progressBar.js'); 

function createServerProfileEmbed(serverUserData, displayName, client, avatarURL) {
    // Create the XP progress bar
    const xpProgressBar = createXPProgressBar({
        xp: serverUserData.serverXP,
        xpRequired: serverUserData.serverXPRequired
    });

    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`<:profileIcon:1198857853583237141> ${displayName}'s Server Profile`)
        .setThumbnail(avatarURL)
        .addFields(
            { 
                name: '<:xpIcon:1198854751832506479> Server XP Progress', 
                value: `${serverUserData.serverXP.toFixed(1)}/${serverUserData.serverXPRequired}\n${xpProgressBar}`,
                inline: false 
            }, 
            { name: '<:levelsIcon:1198822606380482611> Server Level', value: serverUserData.serverLevel.toString(), inline: true },
            { name: '<:messageIcon:1198841543994376272> Server Messages', value: serverUserData.serverMessageCount.toString(), inline: true }, 
        )
        .setFooter({ text: 'Server Profile command', iconURL: client.user.displayAvatarURL() }) 
        .setTimestamp();

    return embed;
}

module.exports = createServerProfileEmbed;