const Discord = require('discord.js');

module.exports.run = async function(client, message, args) {
    let yetkili = message.member
    if(!yetkili.permissions.has("MANAGE_MESSAGES")) return message.reply("Yetersiz yetki")
    message.channel.bulkDelete(args[0] > 100 ? 100 : args[0] < 1 ? 1 : args[0])
    message.channel.send(`${args[0] > 100 ? 100 : args[0] < 1 ? 1 : args[0]} tane mesajı sildim.`)    
}

module.exports.config = {
    name: "temizle",
    desc: "Temizleme komutu",
    aliases: ["clear", "sil"]
}


