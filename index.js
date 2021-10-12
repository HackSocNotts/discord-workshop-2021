const { Client, Intents } = require("discord.js")
const https = require("https")
const fs = require("fs")

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on("messageCreate", msg => {
    if (msg.content === "ping") {
	msg.reply("pong")
    }

    if (msg.content.startsWith("cat")) {
	var caption = msg.content.substring(4)
	const file = fs.createWriteStream("image.jpg")
	const req = https.get(`https://cataas.com/cat/says/${caption}`, resp => {
	    resp.pipe(file)
	    file.on("finish", () => {
		msg.channel.send({ content: "the cat", files: [ "image.jpg" ] })
	    })
	})
    }
})

client.login("ODk3NTQ1MjMwNjUwMzM5Mzg4.YWXOIg.NRgblhTikAhtXOrYX0UF_YuBN_g")
