const { Client, IntentsBitField } = require('discord.js');
const { MongoClient } = require('mongodb');
require("dotenv/config");

const uri = process.env.MONGO_URI;
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const connectToDatabase = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db();
};

const saveTimerToMongoDB = async (db, userId, timestamp, channelId) => {
    const timersCollection = db.collection('bump-timers');
    await timersCollection.insertOne({ userId, timestamp, channelId });
    console.log('✅ Timer saved to MongoDB');
};

const loadAndResumeTimers = async (db, client) => {
    const timersCollection = db.collection('bump-timers');
    const currentTimers = await timersCollection.find({ timestamp: { $gt: Date.now() } }).toArray();

    currentTimers.forEach((timer) => {
        const timeRemaining = timer.timestamp - Date.now();
        setTimeout(async () => {
            const channel = await client.channels.fetch(timer.channelId);
            channel.send(`<@&1191185520382988388>, the server is ready to be bumped!`);
            console.log(`Reminder sent to role <@&1191185520382988388>`);
            // Delete the timer from MongoDB when it expires
            await deleteTimerFromMongoDB(db, timer.userId);
        }, timeRemaining);
    });

    console.log('✅ Timers loaded and resumed');
};

const deleteTimerFromMongoDB = async (db, userId) => {
    const timersCollection = db.collection('bump-timers');
    await timersCollection.deleteOne({ userId });
    console.log(`✅ Timer for user ${userId} deleted from MongoDB`);
};

client.on('ready', async () => {
    console.log(`✅ ${client.user.tag} is online.`);
    const db = await connectToDatabase();
    await loadAndResumeTimers(db, client);
});

client.on('messageCreate', async (message) => {
    if (message.content.includes('Bump done!')) {
        const db = await connectToDatabase();
        const userId = message.author.id;
        const timestamp = Date.now() + 5000;

        await saveTimerToMongoDB(db, userId, timestamp, message.channel.id);

        setTimeout(async () => {
            message.reply('<@&1191185520382988388> the server is ready to be bumped!');
            // Delete the timer from MongoDB when it expires
            await deleteTimerFromMongoDB(db, userId);
        }, timestamp - Date.now());
    }
});

client.login(process.env.TOKEN);