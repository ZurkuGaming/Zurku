const BumpTimer = require('../models/bumpTimer.js');
const GuildData = require('../models/guildData.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.id === '302050872383242240' && message.content === 'Bump done!') {
            try {
                const currentGuildData = await GuildData.findOne({ guildID: message.guild.id });
                if (currentGuildData && message.channel.id === currentGuildData.bumpChannelID) {
                    const newTimer = new BumpTimer({
                        guildId: message.guild.id,
                        timerEnd: Date.now() + 2 * 60 * 60 * 1000, // 2 hours from now
                    });
                    await newTimer.save();

                }
            } catch (err) {
                console.log(err);
            }
        }
    },
};