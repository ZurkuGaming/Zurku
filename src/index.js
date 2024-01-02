const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Define the intents your bot will use
const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  // Add any other intents your bot requires
];

// Initialize Discord.js client with intents
const client = new Client({ intents });

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI);

// Handle successful MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Handle MongoDB connection error
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Login to Discord
client.login(process.env.TOKEN);

// Handle bot ready event
client.once('ready', () => {
  console.log(`${client.user.tag} is online.`);
  // Set your bot's custom status here
  client.user.setActivity({
    name: ':)', // Replace with your custom status text
    type: 'CUSTOM_STATUS',
  });
});

// Handle errors
client.on('error', (error) => {
  console.error('Bot error:', error.message);
});

// Handle messages
client.on('messageCreate', (message) => {
  // Your message handling code here
  if (message.author.bot) return; // Ignore messages from other bots

  // Example: Respond to a specific command
  if (message.content.toLowerCase() === '!hello') {
    message.reply('Hello!');
  }

  // Add more message handling logic as needed
});

// Add other event handlers and bot functionality here

// Example of command handling (assuming you have a commands folder)
client.commands = new Map();
const commandsDir = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsDir, file));
  client.commands.set(command.name, command);
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (!client.commands.has(commandName)) return;

  try {
    await client.commands.get(commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});