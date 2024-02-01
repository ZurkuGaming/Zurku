// profileButtons.js
const createProfileEmbed = require('../embeds/profileEmbed');
const createServerProfileEmbed = require('../embeds/serverProfileEmbed');
const UserData = require('../models/userData.js');
const ServerUserData = require('../models/serverUserData.js');

module.exports = function handleProfileButtonInteraction(client) {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;

        // Get the user ID from the custom ID of the button
        const [action, userId] = interaction.customId.split(':');

        if (action !== 'serverProfile' && action !== 'globalProfile') return;

        // Fetch the user from Discord's API
        const user = await client.users.fetch(userId);

        if (!user) {
            console.error('No user found for userID:', userId);
            return;
        }

        const displayName = user.username;
        const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true });
        let newEmbed;
        switch (action) {
            case 'globalProfile': 
                const userData = await UserData.findOne({ username: displayName });
                newEmbed = await createProfileEmbed(userData, displayName, client, avatarURL);
                break;
                case 'serverProfile':
                    const guildId = interaction.guild.id;
                    let serverUserData = await ServerUserData.findOne({ userID: userId, guildID: guildId });
                    if (!serverUserData) {
                        // Create a default server user data object
                        serverUserData = {
                            serverXP: 0,
                            serverXPRequired: 100,
                            serverLevel: 0,
                            serverMessageCount: 0,
                        };
                    }
                    newEmbed = await createServerProfileEmbed(serverUserData, displayName, client, avatarURL);
                    break;
            default:
                return;
        }
        try {
            await interaction.update({ embeds: [newEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this button interaction!', ephemeral: true });
        }
    });
};