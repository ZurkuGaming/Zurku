module.exports = async (message) => {
    if (message.author.bot) return;
    if (message.guild) {
        const db = await connectToDatabase();
        const userId = message.author.id;
        await updateUserMessageCount(db, userId);
    }
    if (message.content.includes('Bump done!')) {
        const db = await connectToDatabase();
        const userId = message.author.id;
        const timestamp = Date.now() + 5000;

        await saveTimerToMongoDB(db, userId, timestamp, message.channel.id, message.id);
        await updateUserMessageCount(db, userId);

        setTimeout(async () => {
            const bumpMessage = await message.channel.messages.fetch(message.id);
            bumpMessage.reply('<@&1191185520382988388>, the server is ready to be bumped!');
            await deleteTimerFromMongoDB(db, userId);
        }, timestamp - Date.now());
    }
};