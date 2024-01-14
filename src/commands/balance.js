// balance.js
const UserData = require('../models/userData.js');
const balanceEmbed = require('../embeds/balanceEmbed.js');

module.exports = {
    data: {
        name: 'balance',
        description: 'Show the user\'s balance',
        category: 'Activities',
    },
    execute: async (interaction, client) => {
        // Get the UserData document for this user
        const userData = await UserData.findOne({ userID: interaction.user.id });

        if (!userData) {
            return interaction.reply('You do not have a profile yet!');
        }

        // Send the user's balance
        const displayName = interaction.member.displayName;
        const embed = balanceEmbed(interaction.user, userData.stellar, userData.starShards, displayName, client);
        interaction.reply({ embeds: [embed] });
    },
};