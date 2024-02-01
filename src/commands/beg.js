const UserData = require('../models/userData');
const generateBegEmbed = require('../embeds/begEmbed');

// Define a Map to store user cooldowns
const cooldowns = new Map();

module.exports = {
    data: {
        name: 'beg',
        description: 'Beg for stellar',
        category: 'Economy',
    },
    async execute(interaction) {
        try {
            // Get the user's ID
            const userId = interaction.user.id;

            // Check if the user is in the cooldown Map
            if (cooldowns.has(userId)) {
                // Get the user's cooldown end time
                const cooldownEnd = cooldowns.get(userId);

                // If the current time is less than the cooldown end time, return an error message
                if (Date.now() < cooldownEnd) {
                    const timeLeft = ((cooldownEnd - Date.now()) / 1000).toFixed(1);
                    return interaction.reply({ content: `You need to wait ${timeLeft} more second(s) before using the /beg command again.`, ephemeral: true });
                }
            }

            // Set the user's cooldown end time to 30 seconds from now
            cooldowns.set(userId, Date.now() + 30000);

            // Get the user's data
            const userData = await UserData.findOne({ userID: interaction.user.id });

            if (!userData) {
                // Handle case where user data doesn't exist
            } else {
                // Determine if the beg is successful or not (10% chance for unsuccessful beg)
                const isSuccessful = Math.floor(Math.random() * 10) + 1 !== 1;

                // Generate a random amount of stellar
                let stellarReceived;
                if (isSuccessful) {
                    // Successful beg: add stellar
                    stellarReceived = Math.floor(Math.random() * 251);
                    userData.stellar += stellarReceived;
                } else {
                    // Unsuccessful beg: subtract stellar
                    stellarReceived = -Math.floor(Math.random() * 251);
                    if (userData.stellar + stellarReceived < 0) {
                        // If the user has 0 stellar, don't allow them to go negative
                        stellarReceived = 0;
                        userData.stellar = 0;
                    } else {
                        userData.stellar += stellarReceived;
                    }
                }
                await userData.save();

            // Define response messages
            const successfulResponses = [
                `Congratulations! You found a dusty old wallet with **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers inside. Lucky you!`,
                `A generous bystander saw you and decided to gift you **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers. Unexpected kindness!`,
                `You reached into the fountain of <:stellerIcon:1198818044546387979> Stellers and pulled out **${stellarReceived}**! Make a wish for more next time!`,
                `You stumbled upon a hidden stash and claimed **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers. Luck is on your side!`,
                `A passing shooting star dropped **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers just for you. Quick, make a wish!`,
                `You played a game of <:stellerIcon:1198818044546387979> Stellar hide and seek and found **${stellarReceived}**! You're a master seeker!`,
                `A talking parrot flew by and handed you **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers. Polly wants you to have them!`,
                `You peeked under a rainbow and discovered a pot of <:stellerIcon:1198818044546387979> Stellers! You now have **${stellarReceived}**.`,
                `You picked up a lucky penny and it magically transformed into **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers!`,
                `A friendly alien beamed down and gifted you **${stellarReceived}** <:stellerIcon:1198818044546387979> Stellers. Extraterrestrial generosity!`
            ];

            // Define unsuccessful responses
            const unsuccessfulResponses = [
                `You checked your pockets, but alas, no <:stellerIcon:1198818044546387979> Stellers today. Keep dreaming!`,
                `You tripped and dropped **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers. Watch your step next time!`,
                `A gust of wind blew away **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers from your hand. Bad luck!`,
                `You accidentally donated **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers to a charity. Well, at least it's for a good cause!`,
                `You bought a lottery ticket and lost **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers. Better luck next time!`,
                `You were fined **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers for littering. Remember to keep the environment clean!`,
                `You bet **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers on a horse race and lost. Don't gamble your Stellers away!`,
                `A pickpocket stole **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers from you. Be more careful!`,
                `You paid **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers for a fortune telling, but it didn't come true. Don't trust those scams!`,
                `You invested **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers in a business, but it failed. Better luck with your next venture!`,
                `You spent **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers on a magic bean, but it didn't grow. Don't believe in fairy tales!`,
                `You gave **${-stellarReceived}** <:stellerIcon:1198818044546387979> Stellers to a con artist. Be more skeptical next time!`
            ];

                // If the user has 0 stellar and the beg is unsuccessful, use the specific unsuccessful response
                if (stellarReceived === 0) {
                    unsuccessfulResponses[0] = `You checked your pockets, but alas, no <:stellerIcon:1198818044546387979> Stellers today. Keep dreaming!`;
                }

                // Generate the embed message
                const embed = generateBegEmbed(stellarReceived, successfulResponses, unsuccessfulResponses, interaction.client);

                // Send the embed message
                interaction.reply({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err);
        }
    },
};