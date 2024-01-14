const mongoose = require('mongoose');

const guildDataSchema = new mongoose.Schema({
    guildID: String,
    welcomeChannelID: String,
    goodbyeChannelID: String,
    bumpChannelID: String,
    bumpRoleID: String,
});

module.exports = mongoose.model('GuildData', guildDataSchema);