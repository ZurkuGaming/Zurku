const updateUserMessageCount = async (db, userId) => {
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ userId }, { $inc: { messageCount: 1 } }, { upsert: true });
};

module.exports = {
    updateUserMessageCount,
};