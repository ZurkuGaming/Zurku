// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
  data: {
    name: 'goodbye',
    description: 'Set the goodbye channel',
    category: 'Settings',
    options: [{
      name: 'channel',
      description: 'The channel to set as the goodbye channel',
      type: 7,
      required: true
    }]
  },
  async execute (interaction) {
    // Check if the user has admin permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to use this command.')
    }
    const channel = interaction.options.get('channel').channel;

    // Set the goodbye channel
    const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
    if (!guildData) {
      // If no data for the guild was found, create a new document
      const newGuildData = new GuildData({
        guildID: interaction.guild.id,
        goodbyeChannelID: channel.id
      });
      await newGuildData.save();
    } else {
      // If data for the guild was found, update the document
      guildData.goodbyeChannelID = channel.id;
      await guildData.save();
    }

    await interaction.reply({ content: `Goodbye channel set to ${channel.name}`, ephemeral: true });
  }
}