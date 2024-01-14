const mineEmbed = require('../embeds/mineEmbed');
const userData = require('../models/userData');

module.exports = {
    data: {
        name: 'mine',
        description: 'Mine to gain XP',
        category: 'Activities',
    },
    async execute(interaction, client) { 
        // Get the user's data
        let user = await userData.findOne({ userID: interaction.user.id });
        if (!user) {
            user = new userData({ userID: interaction.user.id, playerXP: 0 });
        }

        // Generate a random number between 1 and 5
        const xpGain = Math.floor(Math.random() * 5) + 1;

        // Increase the user's XP
        user.playerXP += xpGain;
        await user.save();

        // Send the mineEmbed message
        await interaction.reply({ embeds: [mineEmbed(client)] });
    },
};