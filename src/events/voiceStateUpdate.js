const UserData = require('../models/userData')

// Create a Map to store the join times
const joinTimes = new Map()

module.exports = {
  name: 'voiceStateUpdate',
  async execute (oldState, newState, client, commands) {
    // Check if the user has joined a voice channel
    // Check if the user has joined a voice channel
    if (!oldState.channelId && newState.channelId) {
    // User has joined a voice channel
    // Check if the user is already in the Map
      if (!joinTimes.has(newState.member.id)) {
      // Store the join time in the Map
        joinTimes.set(newState.member.id, Date.now())
      }
    } else if (oldState.channelId && !newState.channelId) {
      // User has left a voice channel
      // Check if we have a join time for the user
      if (!joinTimes.has(oldState.member.id)) {
        return
      }

      // Calculate the time spent in the voice channel (in seconds)
      const joinTime = joinTimes.get(oldState.member.id)
      const timeSpent = Math.round((Date.now() - joinTime) / 1000)

      // Calculate the XP increase (100 XP per second)
      const xpIncrease = timeSpent * 1

      // Update the user's global XP
      await UserData.updateOne(
        { userID: oldState.member.id },
        { $inc: { xp: xpIncrease } },
        { upsert: true }
      )

      // Remove the join time from the Map
      joinTimes.delete(oldState.member.id)
    }
  }
}
