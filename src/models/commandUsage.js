// src/models/commandUsage.js
const mongoose = require('mongoose');

const commandUsageSchema = new mongoose.Schema({
  commandName: String,
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('CommandUsage', commandUsageSchema);