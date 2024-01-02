require('dotenv/config');

const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { connectToDatabase, loadAndResumeTimers, saveTimerToMongoDB, deleteTimerFromMongoDB, updateUserInviteCount, updateUserMessageCount } = require('./database/connectToDatabase');
const { sendWelcomeEmbed } = require('./welcome');
const { sendGoodbyeEmbed } = require('./goodbye');

const uri = process.env.MONGO_URI;
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildInvites,
    ]
});

client.on('guildCreate', require('./events/guildCreate'));
client.on('guildMemberAdd', require('./events/guildMemberAdd'));
client.on('interactionCreate', require('./events/interactionCreate'));
client.on('messageCreate', require('./events/messageCreate'));
client.on('ready', async () => {
    console.log(`✅ ${client.user.tag} is online.`);

    try {
        await client.user.setActivity({
            name: ':)',
            type: ActivityType.Custom
        });
        console.log('✅ Activity set successfully');

        const db = await connectToDatabase(uri);

        // Call loadAndResumeTimers after successfully connecting to the database
        await loadAndResumeTimers(db, client);

        // No need to load commands if not used
        // const commands = loadCommands();

        const application = await client.application?.fetch();
        if (application) {
            // No need to set commands if not used
            // await application.commands.set(commands);
            console.log('✅ Slash commands loaded globally');
        } else {
            console.error('❌ Unable to fetch the application.');
        }
    } catch (error) {
        console.error('❌ Error setting activity or loading commands:', error.message);
    }
});

console.log('URI:', uri);
client.login(process.env.TOKEN);