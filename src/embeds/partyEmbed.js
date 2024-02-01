// partyEmbed.js
const { EmbedBuilder } = require('discord.js');

module.exports = function generatePartyEmbed(partyId, memberDetails) {
  const embed = new EmbedBuilder()
    .setTitle(`Party ID: ${partyId}`)
    .setColor('#050505')
    .setDescription('<:xpIcon:1198854751832506479> 5% XP Boost!');

  memberDetails.forEach(detail => {
    const name = detail.isLeader ? detail.name : `${detail.name} 🎉`;
    embed.addFields({ name: name, value: `Level: ${detail.level}\nMessages: ${detail.messages}\nRep: ${detail.rep}` });
  });

  return embed;
};