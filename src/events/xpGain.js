// xpGain.js
const UserData = require('../models/userData.js');
const createLevelUpEmbed = require('../embeds/levelUpEmbed.js');

// Store the timestamps of the last message for each user
const lastMessageTimestamps = new Map();

module.exports = {
  name: 'messageCreate',
  async execute (message) {
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

    // Get or create a UserData document for this user
    let userData;
    try {
      userData = await UserData.findOne({ userID: message.author.id });
      if (!userData) {
        userData = new UserData({ userID: message.author.id, xp: 0, level: 0, xpRequired: 100 });
        await userData.save();
      }
    } catch (error) {
      console.error('Error finding or creating user data: ', error);
      return;
    }

    // Calculate XP requirement for the current level
    function calculateXPRequirement(level) {
      return Math.pow(level, 2) * 100;
    }

// Check if user has enough XP to level up
async function checkLevelUp(userData, message) {
  // Keep leveling up the user until their XP is less than the XP required for the next level
  while (userData.xp >= userData.xpRequired) {
    // User has enough XP to level up
    userData.level++;
    // Subtract the XP requirement from the user's XP
    userData.xp -= userData.xpRequired;
    // Calculate and update the XP requirement for the next level
    userData.xpRequired = calculateXPRequirement(userData.level + 1);
    userData.hasLeveledUp = true; // Set hasLeveledUp to true
  }

  // If the user has leveled up, send a level up message and reset hasLeveledUp
  if (userData.hasLeveledUp) {
    // Create a level up embed
    const embed = createLevelUpEmbed(userData.level, message.client);
    // Send the level up embed
    await message.channel.send({ embeds: [embed] });
    userData.hasLeveledUp = false; // Reset hasLeveledUp
  }
}

    // Add a random amount of XP to the user's total
    const xpGain = Math.floor(Math.random() * 5) + 1;
    userData.xp += xpGain;

    // Check if user has enough XP to level up
    await checkLevelUp(userData, message);

    // Save the UserData document
    try {
      await userData.save();
    } catch (error) {
      console.error('Error saving user data: ', error);
      return;
    }
  },
};