const { EmbedBuilder } = require('discord.js');

module.exports = function mineEmbed(client) {
  return new EmbedBuilder()
    .setColor('#050505')
    .setTitle('⛏️ Mining Success!')
    .setDescription('You have started mining. You will gain XP when you finish.')
    .setTimestamp()
    .setFooter({ text: 'Mining message', iconURL: client.user.displayAvatarURL() })
};