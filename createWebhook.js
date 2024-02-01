require('dotenv').config()
const Discord = require('discord.js')
const fetch = require('isomorphic-fetch')

// Create a new Discord client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildWebhooks,
  ]
})

client.once('ready', async () => {
  const guild = client.guilds.cache.get('1005954362960531578') // Replace with your guild ID

  if (!guild) {
    console.error('Guild not found')
    return
  }

  // Fetch all channels in the guild
  const channels = await guild.channels.fetch()

  // Iterate over each channel
  channels.each(async (channel) => {
    // Check if the channel is a text channel
    if (channel.type === 0) {
      // Fetch the webhooks of the channel
      const webhooks = await channel.fetchWebhooks()

      // Log the name, URL, and channel of each webhook
      webhooks.each(webhook => console.log(`Webhook: ${webhook.name}, URL: ${webhook.url}, Channel: ${channel.name}`))
    }
  })
})

// Login to Discord with your app token
client.login(process.env.TOKEN)