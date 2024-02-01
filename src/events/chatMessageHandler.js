module.exports = async (client) => {
    client.on('messageCreate', async (message) => {
        // Ignore messages from bots or non-guild channels
        if (message.author.bot || !message.guild) return;

        const chatSessionManager = client.chatSessionManager;
        const sessionId = chatSessionManager.findSessionByUserId(message.author.id);

        if (sessionId) {
            try {
                await chatSessionManager.relayMessage(sessionId, message.author.id, message.content, client);
            } catch (error) {
                console.error('Error in relaying message:', error);
            }
        }
    });
};
