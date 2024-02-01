const UserData = require('../models/userData');
const Party = require('../models/partyData.js');
const ServerUserData = require('../models/serverUserData.js');

// Create a Map to store the join times and intervals
const joinTimes = new Map();
const intervals = new Map();

module.exports = {
  name: 'voiceStateUpdate',
  async execute (oldState, newState, client, commands) {
    // Check if the user has joined a voice channel
    if (!oldState.channelId && newState.channelId) {
      // User has joined a voice channel
      // Check if the user is already in the Map
      if (!joinTimes.has(newState.member.id)) {
        // Store the join time in the Map
        joinTimes.set(newState.member.id, Date.now());

        // Start giving XP every minute
        const interval = setInterval(async () => {
          // Calculate the time spent in the voice channel (in seconds)
          const joinTime = joinTimes.get(newState.member.id);
          const timeSpent = Math.round((Date.now() - joinTime) / 1000);

          let xpIncrease = timeSpent * Math.floor(Math.random() * 5) + 1;

          // Check if the user is in a party
          const party = await Party.findOne({ $or: [{ leader: newState.member.id }, { members: newState.member.id }] });
          if (party) {
            // If they are in a party, increase the XP gain by 5%
            xpIncrease *= 1.05;
          }

          // Update the user's global XP
          await UserData.updateOne(
            { userID: newState.member.id },
            { $inc: { xp: xpIncrease } },
            { upsert: true }
          );

          // Update the user's server XP
          await ServerUserData.updateOne(
            { userID: newState.member.id, guildID: newState.guild.id },
            { $inc: { serverXP: xpIncrease } },
            { upsert: true }
          );

          // Update the join time in the Map
          joinTimes.set(newState.member.id, Date.now());
        }, 1000); // 1 second = 1000 milliseconds

        // Store the interval in the Map
        intervals.set(newState.member.id, interval);
      }
    } else if (oldState.channelId && !newState.channelId) {
      // User has left a voice channel
      // Check if we have a join time for the user
      if (!joinTimes.has(oldState.member.id)) {
        return;
      }

      // Clear the interval
      clearInterval(intervals.get(oldState.member.id));

      // Remove the join time and interval from the Maps
      joinTimes.delete(oldState.member.id);
      intervals.delete(oldState.member.id);
    }
  }
};