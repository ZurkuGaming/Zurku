// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
  data: {
    name: 'bump',
    description: 'Set the bump channel and role',
    category: 'Settings',
    options: [{
      name: 'channel',
      description: 'The channel to set as the bump channel',
      type: 7,
      required: true
    }, {
      name: 'role',
      description: 'The role to set for the bump',
      type: 8,
      required: true
    }]
  },
  async execute (interaction) {
    // Check if the user has admin permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to use this command.')
    }
    const channel = interaction.options.get('channel').channel;
    const role = interaction.options.get('role').role; // Get the role from the options

    // Set the bump channel and role
    const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
    if (!guildData) {
      // If no data for the guild was found, create a new document
      const newGuildData = new GuildData({
        guildID: interaction.guild.id,
        bumpChannelID: channel.id,
        bumpRoleID: role.id
      });
      await newGuildData.save();
    } else {
      // If data for the guild was found, update the document
      guildData.bumpChannelID = channel.id;
      guildData.bumpRoleID = role.id; // Update the role ID
      await guildData.save();
    }

    await interaction.reply({ content: `Bump channel set to ${channel.name} and bump role set to ${role.name}`, ephemeral: true });
  }
}