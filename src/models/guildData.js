const mongoose = require('mongoose');

const guildDataSchema = new mongoose.Schema({
    guildID: String,
    welcomeChannelID: String,
    goodbyeChannelID: String,
    bumpChannelID: String,
    bumpRoleID: String,
    autoRoleID: String,
    levelUpMessages: { type: Boolean, default: true },
    levelUpChannelID: String, 
});

module.exports = mongoose.model('GuildData', guildDataSchema);