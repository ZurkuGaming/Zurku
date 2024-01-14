// profileEmbed.js
const { EmbedBuilder } = require('discord.js');
const { createXPProgressBar } = require('../utils/progressBar.js'); 

function createProfileEmbed(userData, displayName, client, avatarURL) {
    // Create the XP progress bar
    const xpProgressBar = createXPProgressBar(userData);

    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle(`📝 ${displayName}'s Profile`)
        .setThumbnail(avatarURL)
        .setDescription(`📌 **About Me:** ${userData.bio || 'No bio set'}`)
        .addFields(
            { 
                name: '✨ XP Progress', 
                value: `${userData.xp}/${userData.xpRequired}\n${xpProgressBar}`,
                inline: false 
            }, 
            { name: '💪 Level', value: userData.level.toString(), inline: true },
            { name: '📨 Messages', value: userData.messageCount.toString(), inline: true }, 
            { name: '⭐ Reputation', value: userData.rep.toString(), inline: true },
        )
        .setFooter({ text: 'Profile command', iconURL: client.user.displayAvatarURL() }) 
        .setTimestamp();

    return embed;
}

module.exports = createProfileEmbed;