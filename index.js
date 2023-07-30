const telegramBot = require('node-telegram-bot-api')
const BitlyClient = require('bitly').BitlyClient
const url = require('url')
require('dotenv').config()
const bitly = new BitlyClient(process.env.TOKENBITLY)


const shorter = async (long) => {
    const response = await bitly.shorten(long);
    return response.link;
}

const TOKEN = process.env.TOKENBOT

const bot = new telegramBot(TOKEN, { polling: true })

bot.on('message', async (msg) => {
    try {
        const parsedUrl = new url.URL(msg.text)
        console.log(parsedUrl)
        const short = await shorter(parsedUrl)
        bot.sendMessage(msg.from.id, `Your Short Url: ${short}`)
    } catch (error) {
        console.log(error)
        bot.sendMessage(msg.from.id, `Invalid url, Try sending only the url you pretend to short`)
    }
})