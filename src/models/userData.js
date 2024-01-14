// UserData.js
const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  bio: { type: String, default: null },
  rep: { type: Number, default: 0 },
  lastRepDate: { type: Date, default: null },
  messageCount: { type: Number, default: 0 },

  location: { type: String, default: `🏡 Home Planet - Novara Prime` },
  lastTravelDate: { type: Date, default: null },
  stellar: { type: Number, default: 250 },
  starShards: { type: Number, default: 0 },

  playerXP: { type: Number, default: 0 },
  playerXPRequired: { type: Number, default: 100 },
  playerLevel: { type: Number, default: 0 },
  playerHasLeveledUp: { type: Boolean, default: false },

  xp: { type: Number, default: 0 },
  xpRequired: { type: Number, default: 100 },
  level: { type: Number, default: 0 },
  hasLeveledUp: { type: Boolean, default: false },

  inventory: [{
    id: { type: String, required: true },
    itemName: String, 
    itemValue: Number,
    itemType: String,
    amount: { type: Number, default: 1 },
    usable: { type: Boolean, default: false },
    description: String,
  }],
});

module.exports = mongoose.model('UserData', UserDataSchema);