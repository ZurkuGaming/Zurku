// src/utils/eventLoader.js
const fs = require('fs');
const path = require('path');

function loadEvents(client, commands) {
  const events = fs.readdirSync(path.join(__dirname, '../events')).map((file) => {
    try {
      return require(`../events/${file}`)
    } catch (error) {
      console.error(`Failed to load event ${file}:`, error)
      return null
    }
  }).filter(Boolean)

  // Attach events to the client
  events.forEach(event => {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
}

module.exports = loadEvents;