// src/models/lotteryData.js
const mongoose = require('mongoose');

const LotteryDataSchema = new mongoose.Schema({
  participants: { type: [String], default: [] },
  endTime: { type: Date, default: null }, 
});

module.exports = mongoose.model('LotteryData', LotteryDataSchema);