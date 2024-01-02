const saveTimerToMongoDB = async (db, userId, timestamp, channelId, messageId) => {
    const timersCollection = db.collection('bump');
    await timersCollection.insertOne({ userId, timestamp, channelId, messageId });
    console.log('✅ Timer saved to MongoDB');
};

module.exports = {
    saveTimerToMongoDB,
};