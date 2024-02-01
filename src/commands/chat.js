// src/commands/chat.js
const ChatSessionManager = require('../utils/chatSessionManager.js');

module.exports = {
    data: {
        name: 'chat',
        description: 'Manage chat sessions',
        category: 'Utility',
        testing: true,
        options: [
            {
                name: 'start',
                type: 1, // Type 1 for subcommand
                description: 'Start a new chat session',
                options: [
                    {
                        name: 'interest',
                        type: 3, // STRING type
                        description: 'Interest to chat about',
                        required: false, // Make it optional
                    },
                ],
            },
            {
                name: 'end',
                type: 1,
                description: 'End your current chat session',
            },
            {
                name: 'next',
                type: 1,
                description: 'End current session and start a new one',
            },
        ],
    },

    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();
        const chatSessionManager = client.chatSessionManager;

        try {
            switch (subCommand) {
                case 'start':
                    const interest = interaction.options.getString('interest') || 'general';
                    const guildId = interaction.guild.id;
                    const channelId = interaction.channel.id;
                    await chatSessionManager.startSession(interaction.user.id, interest, guildId, channelId);
                    await interaction.reply('Chat session started.');
                    break;

                case 'end':
                    await chatSessionManager.endSession(interaction.user.id);
                    await interaction.reply('Chat session ended.');
                    break;

                case 'next':
                    await chatSessionManager.nextSession(interaction.user.id);
                    await interaction.reply('Moving to the next chat session.');
                    break;
            }
        } catch (error) {
            await interaction.reply(error.message);
        }
    },
};