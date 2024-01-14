const BumpTimer = require('../models/bumpTimer.js');
const GuildData = require('../models/guildData.js');

async function loadTimers(client) {
    const timers = await BumpTimer.find({});
    timers.forEach(async (timer) => {
        const timeRemaining = timer.timerEnd - Date.now();
        if (timeRemaining > 0) {
            setTimeout(async () => {
                await handleTimerEnd(client, timer);
            }, timeRemaining);
        } else {
            // If the timer has already ended, handle it immediately
            await handleTimerEnd(client, timer);
        }
    });
}

async function handleTimerEnd(client, timer) {
    const guild = client.guilds.cache.get(timer.guildId);
    if (guild) {
        const guildData = await GuildData.findOne({ guildID: guild.id });
        if (guildData && guildData.bumpRoleID) {
            const channel = guild.channels.cache.get(guildData.bumpChannelID);
            if (channel) {
                // Include the role in the message
                channel.send(`<@&${guildData.bumpRoleID}> Bump timer ended!`);
            }
        }
    }
    // Delete the timer
    await BumpTimer.deleteOne({ _id: timer._id });
}

module.exports = loadTimers;