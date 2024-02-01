// Zurku/src/commands/reaction.js
const ReactionRole = require('../models/reactionRoles');

module.exports = {
    data: {
        name: 'reaction',
        description: 'Adds a reaction role',
        category: 'Server Settings',
        options: [
            {
                name: 'role',
                type: 8, // 'ROLE' corresponds to 8
                description: 'The role to be assigned',
                required: true,
            },
            {
                name: 'messageid',
                type: 3, // 'STRING' corresponds to 3
                description: 'The ID of the message to react to',
                required: true,
            },
            {
                name: 'emoji',
                type: 3, // 'STRING' corresponds to 3
                description: 'The emoji to react with',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        // Check if the user has the ADMINISTRATOR permission
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const role = interaction.options.getRole('role');
        if (!role) {
            return interaction.reply({ content: 'Role not found.', ephemeral: true });
        }

        const messageId = interaction.options.getString('messageid');
        const message = await interaction.channel.messages.fetch(messageId).catch(() => null);
        if (!message) {
            return interaction.reply({ content: 'Message not found.', ephemeral: true });
        }

        const emojiInput = interaction.options.getString('emoji');
        let emoji;

        // Check if the input is a custom emoji (in the format <a?:name:id>)
        const customEmojiMatch = emojiInput.match(/<a?:\w+:\d+>/);
        if (customEmojiMatch) {
            // If it's a custom emoji, use the entire string representation
            emoji = customEmojiMatch[0];
        } else {
            // If it's not a custom emoji, use the input as is
            emoji = emojiInput;
        }

        try {
            await message.react(emoji);
        } catch (error) {
            return interaction.reply({ content: 'Failed to react with the provided emoji.', ephemeral: true });
        }

        // Store the reaction role data in the database
        const reactionRole = new ReactionRole({
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            messageId: messageId,
            emoji: emoji,
            roleId: role.id,
        });
        await reactionRole.save();

        interaction.reply({ content: 'Reaction role added successfully.', ephemeral: true });
    },
};