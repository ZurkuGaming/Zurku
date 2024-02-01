// serverUserData.js
const mongoose = require('mongoose');

const ServerUserDataSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  guildID: { type: String, required: true },

  serverMessageCount: { type: Number, default: 0 },
  
  serverXP: { type: Number, default: 0 },
  serverXPRequired: { type: Number, default: 100 },
  serverLevel: { type: Number, default: 0 },
  serverHasLeveledUp: { type: Boolean, default: false },
});

module.exports = mongoose.model('ServerUserData', ServerUserDataSchema);