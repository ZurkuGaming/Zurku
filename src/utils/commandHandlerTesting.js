// src/utils/commandHandlerTesting.js
const fs = require('fs').promises;

module.exports = async (client, guildId) => {
  const files = await fs.readdir('./src/commands/');
  const guild = client.guilds.cache.get(guildId);
  const commandsData = [];

  if (!guild) {
    console.error(`Guild with id ${guildId} not found.`);
    return;
  }

  for (let file of files) {
    if (!file.endsWith('.js')) continue;
    let filePath = `../commands/${file}`;
    let commandName = file.split('.')[0];

    // Delete the cached result of the require call
    delete require.cache[require.resolve(filePath)];

    try {
      let props = require(filePath);

      if (props.data.testing) {
        console.log(`⌛ Attempting to load testing command ${commandName}...`);
        commandsData.push(props.data);
      }
    } catch (error) {
      console.error(`An error occurred while processing the command file ${file}:`, error);
    }
  }

  await guild.commands.set(commandsData);
  console.log(`🔧 All testing commands registered to guild ${guildId}.`);
};