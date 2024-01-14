// In joinRoleAdd.js
const GuildData = require('../models/guildData.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        GuildData.findOne({ guildID: member.guild.id }, (error, guildData) => {
            if (error) console.error(error);
            else if (guildData && guildData.joinRoleID) {
                member.roles.add(guildData.joinRoleID)
                    .catch(console.error);
            }
        });
    },
};