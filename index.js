// index.js
require('dotenv').config()
const Discord = require('discord.js')
const db = require('./src/utils/db')
const eventHandler = require('./src/utils/eventHandler')
const webhookInteractionButtons = require('./src/interactions/webhookInteractionButtons')
const handleInteractionCreate = require('./src/interactions/interactionCreate')
const handleButtonInteraction = require('./src/interactions/interactionButtons');
const handleProfileButtonInteraction = require('./src/interactions/profileButtons');
const ChatSessionManager = require('./src/utils/chatSessionManager.js');
db.connect()

// Create a new Discord client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildWebhooks,
  ]
})

// Use the handlers
eventHandler(client)
webhookInteractionButtons(client)
handleInteractionCreate(client)
handleButtonInteraction(client);
handleProfileButtonInteraction(client);
client.chatSessionManager = new ChatSessionManager();

// Login to Discord with your app token
client.login(process.env.TOKEN)