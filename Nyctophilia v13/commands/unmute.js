module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");
        const ms = require("ms");
        const db = require('quick.db');
        const ayarlar = require("../ayarlar.json");
        const prefix = ayarlar.prefix;
        var mutelirolu = "MUTE YİYEN AGAM"
        if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.reply(`:warning: Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`);
      let mutekisi = message.mentions.users.first() || message.guild.members.cache.get(args[0])
      if (!mutekisi)
        return message.reply(
          `:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}unmute <@kullanıcı>**`
        );
        let muterol = message.guild.roles.cache.find(role => role.name == mutelirolu);
        client.channels.cache.get("997403100967092226").send(`${message.member} ${mutekisi} adlı kullanıcının mutesini kaldırdı`)

        mutekisi.roles.remove(muterol.id)
        db.delete(`mute_${mutekisi.id}`)
        message.reply("Muteyi kaldırdım!")
}};


module.exports.config = {
    name: "unmute",
    desc: "unmute",
    aliases: ["unmute"]
}