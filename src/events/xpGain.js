// xpGain.js
const UserData = require('../models/userData.js');
const ServerUserData = require('../models/serverUserData.js');
const createLevelUpEmbed = require('../embeds/levelUpEmbed.js');
const GuildData = require('../models/guildData.js');
const Party = require('../models/partyData.js');

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
      userData = await UserData.findOneAndUpdate(
        { userID: message.author.id },
        { username: message.author.username },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      console.error('Error finding or creating user data: ', error);
      return;
    }

    // Get or create a ServerUserData document for this user in this guild
    let serverUserData;
    try {
      serverUserData = await ServerUserData.findOneAndUpdate(
        { userID: message.author.id, guildID: message.guild.id },
        {},
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      console.error('Error finding or creating server user data: ', error);
      return;
    }

    // Calculate XP requirement for the current level
    function calculateXPRequirement(level) {
      return Math.pow(level, 2) * 100;
    }

// Check if user has enough XP to level up
async function checkLevelUp(userData, serverUserData, message) {
  try {
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

    // Do the same for the server level
    while (serverUserData.serverXP >= serverUserData.serverXPRequired) {
      serverUserData.serverLevel++;
      serverUserData.serverXP -= serverUserData.serverXPRequired;
      serverUserData.serverXPRequired = calculateXPRequirement(serverUserData.serverLevel + 1);
      serverUserData.serverHasLeveledUp = true;
    }

    if (userData.hasLeveledUp) {
      const embed = createLevelUpEmbed(userData.level, message.client);
      try {
        await message.author.send({ embeds: [embed] });
        await message.author.send('You can turn off these level up messages by using /leveldm false.');
      } catch (error) {
        if (error.code === 50007) {
          console.error('Could not send DM: User has DMs disabled or has blocked the bot');
        } else {
          console.error('Could not send DM: ', error);
        }
      }
      userData.hasLeveledUp = false;
    }

    // If the user has leveled up in the server, send a level up message in the channel and reset serverHasLeveledUp
    if (serverUserData.serverHasLeveledUp) {
      // Create a level up embed
      const embed = createLevelUpEmbed(serverUserData.serverLevel, message.client);
      // Send the level up embed in the channel
      await message.channel.send({ embeds: [embed] });

      serverUserData.serverHasLeveledUp = false; // Reset serverHasLeveledUp
    }
  } catch (error) {
    console.error('Error checking level up: ', error);
  }
}

    // Check if the user is in a party
    const party = await Party.findOne({ $or: [{ leader: message.author.id }, { members: message.author.id }] });

      // Add a random amount of XP to the user's total
      let xpGain = Math.floor(Math.random() * 15) + 1;

      if (party) {
        // If they are in a party, increase the XP gain by 5%
        xpGain *= 1.05; // Remove rounding
      }

      userData.xp += xpGain;
      userData.messageCount += 1;

      serverUserData.serverXP += xpGain;
      serverUserData.serverMessageCount += 1;

    // Check if user has enough XP to level up
    await checkLevelUp(userData, serverUserData, message);

    // Save the UserData document
    try {
      await userData.save();
    } catch (error) {
      console.error('Error saving user data: ', error);
      return;
    }

    // Save the ServerUserData document
    try {
      await serverUserData.save();
    } catch (error) {
      console.error('Error saving server user data: ', error);
      return;
    }
  },
};