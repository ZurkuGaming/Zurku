// events/messageReactionRemove.js
const ReactionRole = require('../models/reactionRoles');

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        if (reaction.partial) await reaction.fetch();

        // Get the emoji string
        let emoji;
        if (reaction.emoji.id) {
            // If it's a custom emoji, use the entire string representation
            emoji = `<${reaction.emoji.animated ? 'a' : ''}:${reaction.emoji.name}:${reaction.emoji.id}>`;
        } else {
            // If it's not a custom emoji, use the unicode character
            emoji = reaction.emoji.name;
        }

        // Find the reaction role in the database
        const reactionRole = await ReactionRole.findOne({ messageId: reaction.message.id, emoji: emoji });
        if (!reactionRole) return;

        const guild = reaction.message.guild;
        const role = guild.roles.cache.get(reactionRole.roleId);
        const member = guild.members.cache.get(user.id) || await guild.members.fetch(user.id);
        if (role && member) {
            member.roles.remove(role).catch(error => {
                console.error(`Failed to remove role: ${error}`);
            });
        }
    }
};