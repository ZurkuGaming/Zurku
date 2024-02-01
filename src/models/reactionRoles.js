// models/reactionRoles.js
const mongoose = require('mongoose');

const ReactionRoleSchema = new mongoose.Schema({
    guildId: String,
    channelId: String,
    messageId: String,
    emoji: String,
    roleId: String,
});

module.exports = mongoose.model('ReactionRole', ReactionRoleSchema);