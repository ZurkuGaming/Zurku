// cardflipEmbed.js
const { EmbedBuilder } = require('discord.js');

const winEmbed = (flipColor, flipSuit, winAmount, client) => new EmbedBuilder()
    .setColor('#00FF00') // Green in hexadecimal
    .setTitle('🃏 Card Flip Sucess!')
    .setDescription(`Congratulations! The card was **${flipColor} ${flipSuit}**. You won **${winAmount}** <:stellerIcon:1198818044546387979> stellar.`)
    .setFooter({ text: 'Cardflip command', iconURL: client.user.displayAvatarURL() }) 
    .setTimestamp();

const loseEmbed = (flipColor, flipSuit, bet, client) => new EmbedBuilder()
    .setColor('#FF0000') // Red in hexadecimal
    .setTitle('🃏 Card Flip Fail!')
    .setDescription(`Sorry, the card was **${flipColor} ${flipSuit}**. You lost **${bet}** <:stellerIcon:1198818044546387979> stellar.`)
    .setFooter({ text: 'Cardflip Command', iconURL: client.user.displayAvatarURL() }) 
    .setTimestamp();

module.exports = { winEmbed, loseEmbed };