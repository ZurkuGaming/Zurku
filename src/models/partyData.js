const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  leader: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('Party', partySchema);