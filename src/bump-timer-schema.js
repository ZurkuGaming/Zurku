const mongoose = require("mongoose"); // Added import
const Schema = mongoose.Schema;

const bumpTimerSchema = new Schema({
  userId: String,
  timestamp: Number,
  channelId: String,
});

module.exports = mongoose.model("BumpTimer", bumpTimerSchema);