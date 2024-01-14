// messageTracker.js
const UserData = require('../models/userData.js');

// Store the timestamps of the last message for each user
const lastMessageTimestamps = new Map();

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    // Check if message or message.author is undefined
    if (!message || !message.author) return;

    // Ignore messages from bots
    if (message.author.bot) return;

    const now = Date.now();
    const lastMessageTimestamp = lastMessageTimestamps.get(message.author.id);

    // If the user has sent a message in the last second, ignore this message
    if (lastMessageTimestamp && (now - lastMessageTimestamp) < 1000) return;

    // Update the timestamp of the last message for this user
    lastMessageTimestamps.set(message.author.id, now);

    // Get the UserData document for this user
    let userData;
    try {
      userData = await UserData.findOne({ userID: message.author.id });
      if (!userData) {
        // If UserData doesn't exist, don't do anything
        return;
      }
    } catch (error) {
      console.error('Error finding user data: ', error);
      return;
    }

    // Increment the message count
    userData.messageCount += 1;

    // Save the UserData document
    try {
      await userData.save();
    } catch (error) {
      console.error('Error saving user data: ', error);
      return;
    }
  },
};