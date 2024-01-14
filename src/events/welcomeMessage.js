// events/guildMemberAdd.js
const createWelcomeEmbed = require('../embeds/welcomeEmbed.js');
const GuildData = require('../models/guildData');

module.exports = {
  name: 'guildMemberAdd',
  execute: async (member) => {
    const guildData = await GuildData.findOne({ guildID: member.guild.id });
    if (guildData && guildData.welcomeChannelID) {
      const channel = member.guild.channels.cache.get(guildData.welcomeChannelID);
      if (channel) {
        const embed = createWelcomeEmbed(member);
        channel.send({ embeds: [embed] });
      }
    }
  },
};