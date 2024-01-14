// src/utils/commandHandler.js
const fs = require('fs');
const Discord = require('discord.js');

module.exports = (client, { registerToGuild = false, guildId = '' } = {}) => {
  client.commands = new Discord.Collection();

  fs.readdir('./src/commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      let props = require(`../commands/${file}`);
      let commandName = file.split('.')[0];
      console.log(`⌛ Attempting to load command ${commandName}...`);
      client.commands.set(commandName, props);

      if (registerToGuild) {
        // Register to a specific guild
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
          try {
            guild.commands.create(props.data).catch(console.error);
          } catch (error) {
            console.error(`Error while registering command ${commandName} to guild ${guildId}:`, error);
          }
        } else {
          console.error(`Guild with id ${guildId} not found.`);
        }
      } else {
        // Register globally
        try {
          client.application.commands.create(props.data).catch(console.error);
        } catch (error) {
          console.error(`Error while registering command ${commandName} globally:`, error);
        }
      }
    });
  });
};