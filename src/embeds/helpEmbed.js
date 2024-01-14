const { EmbedBuilder } = require('discord.js');

module.exports = (commands, client) => {
  const helpEmbed = new EmbedBuilder()
    .setColor('#050505')
    .setTitle('📚 Commands')
    .setDescription('Here are all the commands:')
    .setFooter({ text: 'Help command', iconURL: client.user.displayAvatarURL() })
    .setTimestamp();

  // Group commands by category
  const categories = {};
  commands.forEach((command) => {
    const category = command.data.category; 
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(command);
  });

  // Add a field for each category
  for (const category in categories) {
    helpEmbed.addFields(
      { 
        name: `🔹 ${category}`, 
        value: categories[category].map(command => `**/${command.data.name}:** ${command.data.description}`).join('\n'), // Access name and description from data object
        inline: false 
      },
    );
  }

  return helpEmbed;
};