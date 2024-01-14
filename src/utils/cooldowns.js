// src/utils/cooldowns.js
const UserData = require('../models/userData');

const travelCooldownTime = 300; // Cooldown time in seconds

async function travelCooldown(userId) {
    const user = await UserData.findOne({ userID: userId });

    if (user) {
        const lastTravelDate = user.lastTravelDate;
        const timeSinceLastTravel = (new Date() - lastTravelDate) / 1000; // Time since last travel in seconds

        if (timeSinceLastTravel < travelCooldownTime) {
            return travelCooldownTime - timeSinceLastTravel; // Return remaining cooldown time
        }
    }

    return null; 
}

module.exports = {
    travelCooldown,
};