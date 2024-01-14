// src/events/ready.js
const { ActivityType } = require('discord.js');
const commandHandler = require('../utils/commandHandler'); 
const loadTimers = require('../utils/loadTimers');

module.exports = {
  name: 'ready',
  execute: (client) => {
    console.log(`✅ Bot is online!`);

    const serverCount = client.guilds.cache.size; // Get the number of servers the bot is in

    client.user.setActivity({
      name: `⚰️/help | ${serverCount} servers`, // Show the number of servers in the bot's activity
      type: ActivityType.Custom
    });

    loadTimers(client);
    commandHandler(client, { registerToGuild: true, guildId: '1005954362960531578' });
  }
};