const { EmbedBuilder } = require('discord.js');

module.exports = function createRulesEmbed(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#050505')
        .setTitle('<:y_rules:1197790240652394516> Rules')
        .setDescription('Please follow these rules for a positive experience...')
        .addFields(
            { name: 'Respect Everyone', value: 'No toxicity, harassment, racism, or hate speech.' },
            { name: 'No Advertising', value: 'Keep promotions out of channels and DMs.' },
            { name: 'Mindful Behavior', value: 'Avoid drama; resolve conflicts calmly. No excessive complaints or negativity.' },
            { name: 'Channel Etiquette', value: 'Use channels appropriately. Keep discussions on-topic and organized.' },
            { name: 'No Raiding', value: 'Absolutely no server raids.' },
            { name: 'No NSFW Content', value: 'No NSFW content in any channel.' },
            { name: 'Follow TOS', value: 'Adhere to Discord\'s [Terms of Service](https://discordapp.com/terms).\nRespect Discord\'s Community [Guidelines](https://discordapp.com/guidelines).' },
        )
        .setFooter({ text: 'Rules Info', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();
    return embed;
};