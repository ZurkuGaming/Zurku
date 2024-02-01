// src/managers/ChatSessionManager.js
class ChatSessionManager {
    constructor() {
        this.activeSessions = new Map(); // Maps session IDs to session info
        this.userSessions = new Map(); // Maps user IDs to session IDs
        this.userInterests = new Map(); // Maps user IDs to their interests
    }

    async startSession(userId, interest, guildId, channelId) {
        if (this.userSessions.has(userId)) {
            throw new Error('You are already in an active chat session.');
        }
    
        this.userInterests.set(userId, interest);
        let sessionId = this.findMatchingSession(interest, userId);
    
        if (!sessionId) {
            sessionId = this.createSession(userId, interest, guildId, channelId);
        } else {
            this.addToSession(sessionId, userId, guildId, channelId);
        }

        return this.activeSessions.get(sessionId);
    }

    async endSession(userId) {
        const sessionId = this.userSessions.get(userId);
        if (!sessionId) {
            throw new Error('No active chat session found.');
        }

        this.removeUserFromSession(sessionId, userId);
        if (this.activeSessions.get(sessionId).users.length === 0) {
            this.activeSessions.delete(sessionId);
        }
        this.userSessions.delete(userId);
    }

    async nextSession(userId) {
        await this.endSession(userId);
        const interest = this.userInterests.get(userId) || 'general';
        return this.startSession(userId, interest, null, null);
    }

    findMatchingSession(interest, excludeUserId) {
        for (let [sessionId, sessionInfo] of this.activeSessions.entries()) {
            if (sessionInfo.interest === interest && !sessionInfo.users.some(u => u.userId === excludeUserId)) {
                return sessionId;
            }
        }
        return null;
    }

    createSession(userId, interest, guildId, channelId) {
        const sessionId = `${userId}-${Date.now()}`;
        this.activeSessions.set(sessionId, { users: [{ userId, guildId, channelId }], interest });
        this.userSessions.set(userId, sessionId);
        return sessionId;
    }

    addToSession(sessionId, userId, guildId, channelId) {
        let session = this.activeSessions.get(sessionId);
        session.users.push({ userId, guildId, channelId });
        this.userSessions.set(userId, sessionId);
    }

    removeUserFromSession(sessionId, userId) {
        let session = this.activeSessions.get(sessionId);
        session.users = session.users.filter(u => u.userId !== userId);
    }

    findSessionByUserId(userId) {
        return this.userSessions.get(userId);
    }

    getUserInterest(userId) {
        return this.userInterests.get(userId) || null;
    }

    async relayMessage(sessionId, senderId, messageContent, client) {
        const session = this.activeSessions.get(sessionId);
        if (!session) return;

        for (const user of session.users) {
            if (user.userId !== senderId) {
                try {
                    const guild = await client.guilds.fetch(user.guildId);
                    const channel = await guild.channels.cache.get(user.channelId);
                    if (channel) {
                        await channel.send(`Message from ${senderId}: ${messageContent}`);
                    }
                } catch (error) {
                    console.error('Error relaying message:', error);
                }
            }
        }
    }
}

module.exports = ChatSessionManager;
