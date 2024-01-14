const mongoose = require('mongoose');

const bumpTimerSchema = new mongoose.Schema({
  guildId: { type: String, required: true },
  timerEnd: { type: Date, required: true },
});

module.exports = mongoose.model('BumpTimer', bumpTimerSchema);