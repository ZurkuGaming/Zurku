// events/guildMemberRemove.js
const createGoodbyeEmbed = require('../embeds/goodbyeEmbed.js');
const GuildData = require('../models/guildData');

module.exports = {
  name: 'guildMemberRemove',
  execute: async (member, reason) => { // Add reason argument
    if (!member || !member.guild) {
      console.error('Member or member.guild is undefined');
      return;
    }
    const guildData = await GuildData.findOne({ guildID: member.guild.id });
    if (guildData && guildData.goodbyeChannelID) {
      const channel = member.guild.channels.cache.get(guildData.goodbyeChannelID);
      if (channel) {
        const embed = createGoodbyeEmbed(member);
        channel.send({ embeds: [embed] });
      }
    }
  },
};