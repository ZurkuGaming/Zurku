const UserData = require('../models/userData');

module.exports = {
    data: {
        name: 'weekly',
        description: 'Get your weekly reward',
        category: 'Economy',
    },
    execute: async (interaction, args) => {
        const userID = interaction.user.id;
        const user = await UserData.findOne({ userID: userID });

        const lastWeeklyDate = user.lastWeeklyDate;
        const now = new Date();

        if (lastWeeklyDate && now - lastWeeklyDate < 7 * 24 * 60 * 60 * 1000) {
            let timeLeft = 7 * 24 - (now - lastWeeklyDate) / (60 * 60 * 1000);
            let timeUnit = 'hour(s)';
        
            if (timeLeft >= 24) {
                timeLeft /= 24;
                timeUnit = 'day(s)';
            } else if (timeLeft < 1) {
                timeLeft *= 60;
                timeUnit = 'minute(s)';
            }
        
            interaction.reply({ content: `You have already claimed your weekly reward. Come back in ${Math.floor(timeLeft)} ${timeUnit}!`, ephemeral: true });
            return;
        }

        user.stellar += 5000; // Adjust the reward as per your requirement
        user.starShards += 1000; // Adjust the reward as per your requirement
        user.lastWeeklyDate = now;

        await user.save();

        interaction.reply({ content: 'You have received your weekly reward of <:stellerIcon:1198818044546387979> 7000 Stellar and <:starShardsIcon:1198818040419205162> 1750 Star Shards!', ephemeral: true });
    },
};