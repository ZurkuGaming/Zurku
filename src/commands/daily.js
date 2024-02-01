const UserData = require('../models/userData');

module.exports = {
    data: {
        name: 'daily',
        description: 'Get your daily reward',
        category: 'Economy',
    },
    execute: async (interaction, args) => {
        const userID = interaction.user.id;
        const user = await UserData.findOne({ userID: userID });

        const lastDailyDate = user.lastDailyDate;
        const now = new Date();

        if (lastDailyDate && now - lastDailyDate < 24 * 60 * 60 * 1000) {
            let timeLeft = 24 - (now - lastDailyDate) / (60 * 60 * 1000);
            let timeUnit = 'hour(s)';

            if (timeLeft < 1) {
                timeLeft *= 60;
                timeUnit = 'minute(s)';
            }

            interaction.reply({ content: `You have already claimed your daily reward. Come back in ${Math.floor(timeLeft)} ${timeUnit}!`, ephemeral: true });
            return;
        }

        user.stellar += 500;
        user.starShards += 100;
        user.lastDailyDate = now;

        await user.save();

        interaction.reply({ content: 'You have received your daily reward of <:stellerIcon:1198818044546387979> 250 Stellar and <:starShardsIcon:1198818040419205162> 25 Star Shards!', ephemeral: true });
    },
};