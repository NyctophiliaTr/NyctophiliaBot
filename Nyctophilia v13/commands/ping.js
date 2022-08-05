module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");
        let embed = new Discord.MessageEmbed()
        .setTitle('Gecikme süreniz hesaplanıyor...')
        .setColor("RANDOM")
        .addField('Bot Pingi:', client.ws.ping + ' ms')
        .addField('Mesaj Gecikme Süresi:', `${Date.now() - message.createdTimestamp} ms`)
        message.channel.send({ embeds: [embed] });
    }
}

module.exports.config = {
    name: "ping",
    desc: "gecikme süresi hesaplama",
    aliases: ["ping", "ms"]
}