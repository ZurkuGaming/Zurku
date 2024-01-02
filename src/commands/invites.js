const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Get the number of invites for a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Select a user')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            console.log('Selected User:', user.tag);

            const invites = await interaction.guild.invites.fetch();
            console.log('Fetched Invites:', invites.size);

            const userInvites = invites.filter(invite => invite.inviter && invite.inviter.id === user.id);

            await interaction.editReply(`User ${user.tag} has ${userInvites.size} invite(s).`);
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.followUp('An error occurred while processing the command.');
        }
    },
};