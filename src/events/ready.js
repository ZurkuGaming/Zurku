// src/events/ready.js
const { ActivityType } = require('discord.js');
const DBL = require('dblapi.js');
const commandHandler = require('../utils/commandHandler'); 
const commandHandlerTesting = require('../utils/commandHandlerTesting'); 
const { loadTimers } = require('../utils/loadTimers');
require('../utils/webhookButtons');
const ReactionRole = require('../models/reactionRoles');
const LotteryData = require('../models/lotteryData.js'); 
const lotteryDraw = require('../events/lotteryDraw.js');

module.exports = {
  name: 'ready',
  execute: async (client) => {
    console.log(`✅ Bot is online!`);

    await commandHandler(client);
    await commandHandlerTesting(client, '1005954362960531578');

    const serverCount = client.guilds.cache.size;

    client.user.setActivity({
      name: `⚰️/help | ${serverCount} servers`,
      type: ActivityType.Custom
    });

    // Create a new instance of DBL
    const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDU5NTMxMDI0NTQ3MzQ5ODgiLCJib3QiOnRydWUsImlhdCI6MTcwNTgxNDkxMn0.j6p7_piaz7cIeE0H-C4MWL7W3PZJrs3oRScaUvRZqrQ', client);

    // Post stats to top.gg
    dbl.postStats(serverCount).catch(err => console.error('Failed to post server count:', err));

    loadTimers(client);

    // Fetch all reaction roles from the database
    const reactionRoles = await ReactionRole.find();

    // Fetch each message that has a reaction role
    for (const reactionRole of reactionRoles) {
        const guild = client.guilds.cache.get(reactionRole.guildId);
        if (guild) {
            const channel = guild.channels.cache.get(reactionRole.channelId);
            if (channel) {
                channel.messages.fetch(reactionRole.messageId)
                    .catch(console.error);
            }
        }
    }

    // Check if there's an ongoing lottery
    const ongoingLotteryData = await LotteryData.findOne({});
    if (ongoingLotteryData && ongoingLotteryData.endTime) {
      if (ongoingLotteryData.endTime > Date.now()) {
        // If there's an ongoing lottery, schedule the lottery draw based on the saved end time
        setTimeout(() => lotteryDraw(client), ongoingLotteryData.endTime - Date.now());
      } else {
        // If the lottery end time has already passed, immediately draw a winner
        lotteryDraw(client);
      }
    }
  }
};