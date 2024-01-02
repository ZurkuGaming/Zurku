module.exports = async (guild) => {
    try {
        const invites = await guild.invites.fetch();
        inviteCodes.set(guild.id, invites);
        console.log(`Fetched invites successfully for ${guild.name}`);
    } catch (error) {
        console.error(`Error fetching invites for ${guild.name}: ${error.message}`);
    }
};