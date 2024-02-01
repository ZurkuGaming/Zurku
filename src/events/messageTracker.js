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

    // Log the message content, username, channel name, and server name
    console.log(`___\nServer: ${message.guild.name}\nChannel: ${message.channel.name}\nUser: ${message.author.username}\nMessage: ${message.content}\n___`);
  },
};