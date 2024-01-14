// src/commands/inventory.js
const UserData = require('../models/userData.js');
const createInventoryEmbed = require('../embeds/inventoryEmbed.js');

module.exports = {
  data: {
    name: 'inventory',
    description: 'Check your inventory',
    category: 'Activities',
  },
  async execute(interaction) {
    const user = interaction.user;
    const userData = await UserData.findOne({ userID: user.id });
    const displayName = interaction.member.displayName;

    if (!userData) {
      return interaction.reply('No user data found');
    }

    const embed = createInventoryEmbed(user, displayName, userData.inventory, userData, user.username, interaction.client, user.displayAvatarURL());

    interaction.reply({ embeds: [embed] });
  },
};