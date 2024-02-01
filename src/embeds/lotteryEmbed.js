// src/embeds/lotteryEmbed.js
const { EmbedBuilder } = require('discord.js');

const lotteryEmbed = (userTickets, lotteryData, prizePool, winPercentage, timeLeft, client) => {
  const embed = new EmbedBuilder()
    .setTitle('🎟️ Lottery Information')
    .setColor('#050505')
    .addFields(
        { name: '🎫 Your Tickets', value: String(userTickets), inline: true },
        { name: '🎫 Total Tickets', value: String(lotteryData.participants.length), inline: true },
        { name: '💰 Prize Pool', value: String(prizePool), inline: true },
        { name: '📈 Win %', value: `${winPercentage}%`, inline: true },
        { name: '⏰ Time Left', value: `${timeLeft} seconds`, inline: true },
      )
      .setFooter({ text: 'Good Luck!', iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

  return embed;
};

module.exports = lotteryEmbed;