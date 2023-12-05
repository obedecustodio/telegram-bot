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


    // try {
    //     const parsedUrl = new url.URL(msg.text)
    //     console.log(parsedUrl)
    //     const short = await shorter(parsedUrl)
    //     bot.sendMessage(msg.from.id, `Your Short Url: ${short}`)
    // } catch (error) {
    //     console.log(error)
    //     bot.sendMessage(msg.from.id, `Invalid url, Try sending only the url you pretend to short`)
    // }


try{
    const { prompt } = msg;
    const userId = msg.from.id;
    console.log(msg)
    console.log(msg.from.id)

    const response = await fetch('https://edmbotapi.onrender.com/ai/edmbot-turbo/stream/ask', {
      method: "post",
      credentials: 'include',
      headers: {
        'Authorization': 'dev-aidbuikacalwgdconnamwqirycnvacpaevsbmsoaadaczawacawbbacf-team',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        userId
      })
    });

    if (response.status !== 200) {
      console.log(response)
      bot.sendMessage(msg.from.id, `Invalid url, Try sending only the url you pretend to short`)
      return;
    }

    // Forward the response headers to the client
    res.writeHead(response.status, response.headers);
        bot.sendMessage(msg.from.id, res)

    // Pipe the response stream from the external service to the client response
    // response.body.pipe(res);
    console.log(response)
  } catch (error) {
    console.error(error);
        bot.sendMessage(msg.from.id, `Invalid url, Try sending only the url you pretend to short`)
  }



  
})