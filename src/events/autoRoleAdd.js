const GuildData = require('../models/guildData.js');

module.exports = {
    name: 'guildMemberAdd', 
    execute: async (member) => { 
        try {
            const data = await GuildData.findOne({ guildID: member.guild.id });
            if (data && data.autoRoleID) {
                const role = member.guild.roles.cache.get(data.autoRoleID);
                if (role) {
                    await member.roles.add(role); 
                }
            }
        } catch (error) {
            console.error('Error fetching guild data:', error);
        }
    },
};