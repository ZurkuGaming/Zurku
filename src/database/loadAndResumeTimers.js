const { deleteTimerFromMongoDB } = require('./deleteTimerFromMongoDB');

const loadAndResumeTimers = async (db, client) => {
    const timersCollection = db.collection('bump');
    const currentTimers = await timersCollection.find({ timestamp: { $gt: Date.now() } }).toArray();

    currentTimers.forEach((timer) => {
        const timeRemaining = timer.timestamp - Date.now();
        console.log(`Scheduling timer for user ${timer.userId} with time remaining: ${timeRemaining} ms`);

        setTimeout(async () => {
            console.log(`Executing timer for user ${timer.userId}`);

            const channel = await client.channels.fetch(timer.channelId);

            if (!timer.sent) {
                console.log(`Sending reminder to role <@&1191185520382988388>`);
                channel.send(`<@&1191185520382988388>, the server is ready to be bumped!`);
                await timersCollection.updateOne({ userId: timer.userId }, { $set: { sent: true } });
            }

            console.log(`Deleting timer for user ${timer.userId}`);
            await deleteTimerFromMongoDB(db, timer.userId);
        }, timeRemaining);
    });

    console.log('✅ Timers loaded and resumed');
};

module.exports = loadAndResumeTimers;