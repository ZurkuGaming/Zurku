// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
  data: {
    name: 'joinrole',
    description: 'Set the join role',
    category: 'Settings',
    options: [{
      name: 'role',
      description: 'The role to set as the join role',
      type: 8,
      required: true
    }]
  },
  async execute (interaction) {
    // Check if the user has admin permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to use this command.')
    }
    const role = interaction.options.get('role').role;

    // Set the goodbye role
    const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
    if (!guildData) {
      // If no data for the guild was found, create a new document
      const newGuildData = new GuildData({
        guildID: interaction.guild.id,
        roleJoinID: role.id
      });
      await newGuildData.save();
    } else {
      // If data for the guild was found, update the document
      guildData.roleJoinID = role.id;
      await guildData.save();
    }

    await interaction.reply({ content: `Join role set to ${role.name}`, ephemeral: true });
  }
}