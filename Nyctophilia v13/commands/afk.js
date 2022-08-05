module.exports = {
    async run (client, message, args) {
        const { MessageEmbed } = require('discord.js')
        const db = require('quick.db');
        let neden = args.slice(0).join(' ')
        if(!neden) return message.reply("Bir neden yazmalısın")

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .addField(`Afk`, `**Artık ${neden}**, nedeniyle afk moduna geçtin`)
        message.channel.send({ embeds: [embed] })
        db.set(`afknedeni_${message.author.id}`, neden)
        db.set(`afk_${message.author.id}`, "afk")
        db.set(`engelleme_${message.author.id}`, "engelleme")
    }
}

module.exports.config = {
    name: "afk",
    desc: "afk",
    aliases: ["afk"]
}