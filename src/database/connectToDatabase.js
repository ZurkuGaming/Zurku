const { MongoClient } = require('mongodb');
const { loadAndResumeTimers } = require('./loadAndResumeTimers');  // Import loadAndResumeTimers

let db;

const connectToDatabase = async (uri) => {
    if (db) return db;

    try {
        console.log('Attempting to connect to MongoDB...');
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db();
        console.log('✅ Connected to MongoDB');

        // Pass the database connection to loadAndResumeTimers
        await loadAndResumeTimers(db);

        return db;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        throw error;
    }
};

module.exports = {
    connectToDatabase,
};