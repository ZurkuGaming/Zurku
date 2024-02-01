// Import the GuildData model
const GuildData = require('../models/guildData.js');

module.exports = {
    data: {
        name: 'levelmessage',
        description: 'Turn level up messages on or off and set the level up channel.',
        category: 'Server Settings',
        options: [{
            name: 'toggle',
            description: 'Turn level up messages on/off',
            type: 5, // Boolean type
            required: false
        }, {
            name: 'channel',
            description: 'The channel where level up messages should be sent',
            type: 7, 
            required: false
        }, {
            name: 'remove',
            description: 'Remove the level up messages channel',
            type: 5, // Boolean type
            required: false
        }],
    },
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const on = interaction.options.get('toggle')?.value;
        const channel = interaction.options.get('channel')?.channel;
        const remove = interaction.options.get('remove')?.value;

        // Get or create a GuildData document for this guild
        let guildData;
        try {
            guildData = await GuildData.findOne({ guildID: interaction.guild.id });
            if (!guildData) {
                guildData = new GuildData({ guildID: interaction.guild.id });
                await guildData.save();
            }
        } catch (error) {
            console.error('Error finding or creating guild data: ', error);
            return;
        }

        // If the on option is selected, set levelUpMessages to the selected value
        if (on !== undefined) {
            guildData.levelUpMessages = on;
            await guildData.save();
            return interaction.reply({ content: `Level up messages turned ${on ? 'on' : 'off'}.`, ephemeral: true });
        }

        // If a channel is selected, set the levelUpChannelID to the channel's ID
        if (channel) {
            guildData.levelUpChannelID = channel.id;
            await guildData.save();
            return interaction.reply({ content: `Level up messages channel set to ${channel.name}`, ephemeral: true });
        }

        // If the remove option is selected, unset the levelUpChannelID field
        if (remove) {
            guildData.levelUpChannelID = undefined;
            await guildData.updateOne({ $unset: { levelUpChannelID: "" } });
            return interaction.reply({ content: `Level up messages channel removed.`, ephemeral: true });
        }
    },
};