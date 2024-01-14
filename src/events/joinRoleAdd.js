const GuildData = require('../models/guildData');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const guildData = await GuildData.findOne({ guildID: member.guild.id });
        if (!guildData || !guildData.joinRoleID) {
            console.log(`No join role set for guild ${member.guild.id}`);
            return;
        }

        const role = member.guild.roles.cache.get(guildData.joinRoleID);
        if (!role) {
            console.log(`Role not found for ID ${guildData.joinRoleID}`);
            return;
        }

        member.roles.add(role);
    },
};