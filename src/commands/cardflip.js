// Zurku/src/commands/cardflip.js
const userData = require('../models/userData');
const { winEmbed, loseEmbed } = require('../embeds/cardflipEmbed');

module.exports = {
    data: {
        name: 'cardflip',
        description: 'Bet stellar on a card flip',
        category: 'Economy',
        options: [{
            name: 'bet',
            description: 'Amount to bet',
            type: 4, // Integer type
            required: true
        }, {
            name: 'color',
            description: 'Your guess for the color',
            type: 3, // String type
            required: false,
            choices: [
                { name: 'Black', value: 'black' },
                { name: 'Red', value: 'red' }
            ]
        }, {
            name: 'suit',
            description: 'Your guess for the suit',
            type: 3, // String type
            required: false,
            choices: [
                { name: 'Spades', value: 'spades' },
                { name: 'Hearts', value: 'hearts' },
                { name: 'Diamonds', value: 'diamonds' },
                { name: 'Clubs', value: 'clubs' }
            ]
        }],
    },
    async execute(interaction) {
        const bet = interaction.options.getInteger('bet');
        const colorGuess = interaction.options.getString('color');
        const suitGuess = interaction.options.getString('suit');

        // Check if the user has entered either a color or a suit or both
        if (!colorGuess && !suitGuess) {
            return interaction.reply('You must guess either a color or a suit or both.');
        }

        // Fetch the user's data
        const user = await userData.findOne({ userID: interaction.user.id });

        // Check if the user has enough stellar
        if (user.stellar < bet) {
            return interaction.reply('You do not have enough stellar to make this bet.');
        }

        // Flip the card
        const colors = ['red', 'black'];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const flipColor = colors[Math.floor(Math.random() * colors.length)];
        const flipSuit = suits[Math.floor(Math.random() * suits.length)];

        // Check if the user won or lost
        let winMultiplier = 0;
        if (colorGuess && suitGuess) {
            // If the user guessed both color and suit, they must both be correct
            if (colorGuess === flipColor && suitGuess === flipSuit) {
                winMultiplier = 2 * 4; // 2x for color and 4x for suit
            }
        } else if (colorGuess) {
            // If the user only guessed the color, it must be correct
            if (colorGuess === flipColor) {
                winMultiplier = 2;
            }
        } else if (suitGuess) {
            // If the user only guessed the suit, it must be correct
            if (suitGuess === flipSuit) {
                winMultiplier = 4;
            }
        }

        if (winMultiplier > 0) {
            user.stellar += bet * winMultiplier;
            interaction.reply({ embeds: [winEmbed(flipColor, flipSuit, bet * winMultiplier, interaction.client)] });
        } else {
            user.stellar -= bet;
            interaction.reply({ embeds: [loseEmbed(flipColor, flipSuit, bet, interaction.client)] });
        }

        // Save the user's new stellar amount
        await user.save();
    },
};