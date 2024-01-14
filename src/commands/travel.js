// src/commands/travel.js
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const UserData = require('../models/userData');
const { travelCooldown } = require('../utils/cooldowns');
const locations = require('../data/locationsInfo');

// Store collectors in a map
const collectors = new Map();

module.exports = {
    data: {
        name: 'travel',
        description: 'Travel to a new location',
        category: 'Activities',
    },
    async execute(interaction) {
        const userId = interaction.user.id;
        const cooldownTime = await travelCooldown(userId);
    
        if (cooldownTime) {
            return await interaction.reply({ content: `Your ship is still refueling. ⛽ Please wait ${Math.ceil(cooldownTime)} more seconds. ⌛`, ephemeral: true});
        }
    
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('travel_select')
                .setPlaceholder('Nothing selected')
                .addOptions(locations.map(location => ({
                    label: location.name,
                    value: location.name,
                }))),
        );

        await interaction.reply({ content: 'Select a location to travel to:', components: [row], ephemeral: true });

        const filter = i => i.customId === 'travel_select' && i.user.id === userId;
        
        // Stop the existing collector for the user if it exists
        if (collectors.has(userId)) {
            collectors.get(userId).stop();
        }

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    
        // Store the collector in the map
        collectors.set(userId, collector);

        collector.on('collect', async i => {
            if (i.customId === 'travel_select') {
                const selectedLocation = i.values[0];
            
                const user = await UserData.findOne({ userID: userId });
                if (user) {
                    if (user.location === selectedLocation) {
                        await i.update({ content: `You are already at ${selectedLocation}.`, components: [], ephemeral: true });
                    } else {
                        user.lastTravelDate = new Date(); // Set the cooldown
                        user.location = selectedLocation;
                        await user.save();
                        
                        if (i.replied || i.deferred) {
                            await interaction.followUp({ content: `Traveling to ${selectedLocation}...`, ephemeral: true });
                        } else {
                            await i.update({ content: `Traveling to ${selectedLocation}...`, components: [], ephemeral: true });
                        }
                    }
                } else {
                    await UserData.create({ userID: userId, lastTravelDate: new Date(), location: selectedLocation }); // Set the cooldown for new user
                }
            }
        });

        collector.on('end', () => {
            // Remove the collector from the map when it ends
            collectors.delete(userId);
        });
    },
};