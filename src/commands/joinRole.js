const GuildData = require('../models/guildData');

module.exports = {
    data: {
        name: 'joinrole',
        description: 'Set a role that is given to members when they join',
    },
    async execute(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('You do not have the necessary permissions to use this command.');
        }

        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply(`No role mentioned.`);
        }

        let guildData = await GuildData.findOne({ guildID: message.guild.id });
        if (!guildData) {
            guildData = new GuildData({ guildID: message.guild.id });
        }

        guildData.joinRoleID = role.id;
        await guildData.save();

        return message.reply(`Join role has been set to ${role.name}`);
    },
};