const BumpTimer = require('../models/bumpTimer.js');
const GuildData = require('../models/guildData.js');
const handleTimerEnd = require('../utils/loadTimers.js').handleTimerEnd;

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.id === '302050872383242240') {
            let bumpDoneFound = false;

            // Check message content
            if (message.content.includes('Bump done!')) {
                bumpDoneFound = true;
            }

            // Check embeds
            if (message.embeds.length > 0) {
                message.embeds.forEach(embed => {
                    if (embed.title && embed.title.includes('Bump done!')) {
                        bumpDoneFound = true;
                    }
                    if (embed.description && embed.description.includes('Bump done!')) {
                        bumpDoneFound = true;
                    }
                    if (embed.fields) {
                        embed.fields.forEach(field => {
                            if (field.name.includes('Bump done!') || field.value.includes('Bump done!')) {
                                bumpDoneFound = true;
                            }
                        });
                    }
                });
            }

            if (bumpDoneFound) {
                try {
                    const currentGuildData = await GuildData.findOne({ guildID: message.guild.id });
                    if (currentGuildData && message.channel.id === currentGuildData.bumpChannelID) {
                        const newTimer = new BumpTimer({
                            guildId: message.guild.id,
                            timerEnd: Date.now() + 2 * 60 * 60 * 1000, // 2 hours from now
                        });
                        await newTimer.save();

                        // Set up a timeout for the new timer
                        const timeRemaining = newTimer.timerEnd - Date.now();
                        setTimeout(async () => {
                            await handleTimerEnd(message.client, newTimer);
                        }, timeRemaining);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },
};