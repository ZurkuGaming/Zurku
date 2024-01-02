const deleteTimerFromMongoDB = async (db, userId) => {
    const timersCollection = db.collection('bump');
    await timersCollection.deleteOne({ userId });
    console.log(`✅ Timer for user ${userId} deleted from MongoDB`);
};

module.exports = {
    deleteTimerFromMongoDB,
};