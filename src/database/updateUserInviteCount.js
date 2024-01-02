const updateUserInviteCount = async (db, userId, inviteCount) => {
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ userId }, { $set: { inviteCount } }, { upsert: true });
};

module.exports = {
    updateUserInviteCount,
};