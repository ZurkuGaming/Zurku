// src/utils/commandHandler.js
const fs = require('fs').promises;
const Discord = require('discord.js');
const CommandUsage = require('../models/commandUsage');

module.exports = async (client) => {
  client.commands = new Discord.Collection();

  try {
    const files = await fs.readdir('./src/commands/');
    const commandsData = [];

    for (let file of files) {
      if (!file.endsWith('.js')) continue;
      let filePath = `../commands/${file}`;
      let commandName = file.split('.')[0];
      console.log(`⌛ Attempting to load command ${commandName}...`);

      let props = require(filePath);
      client.commands.set(commandName, props);

      if (!props.data.testing) {
        commandsData.push(props.data);
      }
    }

    await client.application.commands.set(commandsData);
    console.log(`✅ All commands registered globally.`);
  } catch (err) {
    console.error(err);
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    // Don't count command usage for these user IDs
    if (interaction.user.id === '967856657205964870' || interaction.user.id === '989442885785124915') return;
  
    const commandName = interaction.commandName;
    const commandUsage = await CommandUsage.findOne({ commandName });
  
    if (commandUsage) {
      commandUsage.count += 1;
      await commandUsage.save();
    } else {
      await CommandUsage.create({ commandName, count: 1 });
    }
  });
};