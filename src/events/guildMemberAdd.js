module.exports = async (member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '𓆩⟡𓆪᲼welcome');
    if (!channel) return;

    const inviter = await getInviter(member.guild, member);
    sendWelcomeEmbed(channel, member, inviter);
};