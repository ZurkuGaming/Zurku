const mongoose = require('mongoose')

async function connect () {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB Connected!')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { connect }
