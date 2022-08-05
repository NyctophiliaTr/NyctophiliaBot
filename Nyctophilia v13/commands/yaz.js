module.exports = {
    async run (client, message, args) {
        let mesaj = args.slice(0).join(' ');
        if(!mesaj) return message.reply("Eee ne yazacağım?")
        message.delete()
        message.channel.send(mesaj)
    }
}

module.exports.config = {
    name: "yaz",
    desc: "yaz",
    aliases: ["yaz", "yazdır"]
}