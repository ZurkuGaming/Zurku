// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
  data: {
    name: 'joinrole',
    description: 'Set the role to give new members when they join',
    category: 'Settings',
    options: [{
      name: 'role',
      description: 'The role to set as the join role',
      type: 8, // Role type
      required: true
    }]
  },
  async execute (interaction) {
    // Check if the user has admin permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to use this command.')
    }
    const role = interaction.options.get('role').role;

    // Defer the reply
    await interaction.deferReply({ ephemeral: true });

    // Set the join role
    const guildData = await GuildData.findOne({ guildID: interaction.guild.id });
    if (!guildData) {
      // If no data for the guild was found, create a new document
      const newGuildData = new GuildData({
        guildID: interaction.guild.id,
        joinRoleID: role.id
      });
      await newGuildData.save();
    } else {
      // If data for the guild was found, update the document
      guildData.joinRoleID = role.id;
      await guildData.save();
    }

    // Edit the deferred reply
    await interaction.editReply({ content: `Join role set to ${role.name}`, ephemeral: true });
  }
};