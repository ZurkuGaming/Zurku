// src/embeds/inventoryEmbed.js
const { EmbedBuilder } = require('discord.js');

function createInventoryEmbed(user, displayName, inventory, userData, username, client, avatarURL) {
  const embed = new EmbedBuilder()
    .setTitle(`${displayName}'s Inventory`)
    .setColor('#050505')
    .setFooter({ text: 'Profile command', iconURL: client.user.displayAvatarURL() }) 
    .setTimestamp();

  inventory.forEach(item => {
    embed.addFields({ name: item.itemName, value: `Amount: ${item.amount}`, inline: false });
  });

  return embed;
}

module.exports = createInventoryEmbed;