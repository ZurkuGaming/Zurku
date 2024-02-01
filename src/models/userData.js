// UserData.js
const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  username: { type: String, default: null },
  dms: { type: Boolean, default: true },

  lastRepDate: { type: Date, default: null },
  lastDailyDate: { type: Date, default: null },
  lastWeeklyDate: { type: Date, default: null },
  
  bio: { type: String, default: null },
  rep: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  messageCount: { type: Number, default: 0 },

  stellar: { type: Number, default: 250 },
  starShards: { type: Number, default: 0 },

  xp: { type: Number, default: 0 },
  xpRequired: { type: Number, default: 100 },
  level: { type: Number, default: 0 },
  hasLeveledUp: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserData', UserDataSchema);