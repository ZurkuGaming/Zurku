const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const locations = require('../data/locationsInfo.js');

module.exports = {
    data: {
        name: 'locations',
        description: 'List all locations',
        category: 'Activities',
    },
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('locations_select')
                .setPlaceholder('Select a location')
                .addOptions(locations.map(location => ({
                    label: location.name,
                    value: location.name,
                }))),
        );

        await interaction.reply({ content: 'Select a location to read about:', components: [row], ephemeral: true });

        const filter = i => i.customId === 'locations_select' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'locations_select') {
                const selectedLocationName = i.values[0];
                const selectedLocation = locations.find(location => location.name === selectedLocationName);

                if (selectedLocation) {
                    const embed = new EmbedBuilder()
                    .setTitle(selectedLocation.name)
                    .setDescription(selectedLocation.description)
                    .setColor('#050505');
                await i.update({ embeds: [embed], components: [row], ephemeral: true });
            } else {
                await i.update({ content: `No information available for ${selectedLocationName}.`, components: [row], ephemeral: true });
            }
        }
    });
},
};