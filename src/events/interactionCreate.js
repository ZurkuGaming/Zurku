module.exports = async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'invites') {
        try {
            const user = options.getUser('user')
            const userInvites = await getInvitesForUser(interaction.guild, user);
            await updateUserInviteCount(db, user.id, userInvites ? userInvites.size : 0);

            const embed = {
                color: 0x0099ff,
                title: `Invites for ${user.tag}`,
                description: `User ${user.tag} has ${userInvites ? userInvites.size : 0} invite(s).`,
                timestamp: new Date(),
                footer: {
                    text: 'Your footer text here',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing command:', error);

            await interaction.reply('An error occurred while processing the command.');
        }
    }
};