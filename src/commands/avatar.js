// src/commands/avatar.js
const createAvatarEmbed = require('../embeds/avatarEmbed');

module.exports = {
    data: {
        name: 'avatar',
        description: 'Get the avatar URL of the selected user, or your own avatar.',
        category: 'User Profile',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user whose avatar you want to see',
                required: false,
            },
        ]
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = createAvatarEmbed(user, interaction.client);
        await interaction.reply({ embeds: [embed] });
    },
};