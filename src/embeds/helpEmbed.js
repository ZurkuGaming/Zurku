const { EmbedBuilder } = require('discord.js');

module.exports = (commands, client) => {
  const helpEmbed = new EmbedBuilder()
    .setColor('#050505')
    .setTitle('<:y_commands:1197795982671360020> Commands')
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
        name: `<:checkIcon:1198858728007536721> ${category}`, 
        value: categories[category].map(command => `**/${command.data.name}:** ${command.data.description}`).join('\n'), // Access name and description from data object
        inline: false 
      },
    );
  }

  return helpEmbed;
};