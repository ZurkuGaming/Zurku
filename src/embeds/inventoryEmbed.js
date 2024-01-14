// src/embeds/inventoryEmbed.js
const { EmbedBuilder } = require('discord.js');

function createInventoryEmbed(user, displayName, inventory, userData, username, client, avatarURL) {
  const embed = new EmbedBuilder()
    .setTitle(`${displayName}'s Inventory`)
    .setColor('#050505')
    .setFooter({ text: 'Profile command', iconURL: client.user.displayAvatarURL() }) 
    .setTimestamp();

  inventory.forEach(item => {
    embed.addField(item.itemName, `Amount: ${item.amount}`, true);
  });

  return embed;
}

module.exports = createInventoryEmbed;