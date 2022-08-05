module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");
        const ms = require("ms");
        const db = require('quick.db');
        const ayarlar = require("../ayarlar.json");
        const prefix = ayarlar.prefix;
        var mutelirolu = "Muted"
        if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.reply(`:warning: Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`);
      let mutekisi = message.mentions.users.first() || message.guild.members.cache.get(args[0])
      if (!mutekisi)
        return message.reply(
          `:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>**`
        );
      if (mutekisi.permissions.has("MANAGE_MESSAGES"))
        return message.reply(
          `:warning: Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``
        );
      let muterol = message.guild.roles.cache.find(role => role.name == mutelirolu);
      if (!muterol) {
message.reply("Mute rolü yok")
      }
      let mutezaman = args[1]
        .replace(`sn`, `s`)
        .replace(`dk`, `m`)
        .replace(`sa`, `h`)
        .replace(`g`, `d`);
    
      if (!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``);
      db.set(`mute_${mutekisi.id}`,"mute")

      await mutekisi.roles.add(muterol.id);
      let mute = new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL())
        .setColor(0x00ae86)
        .setAuthor("İşlem : Mute")
        .setTimestamp()
        .addField("**Kullanıcı:**", `<@${mutekisi.id}>`)
        .addField("**Moderatör:**", `${message.member}`)
        .addField("**Süre:**", args[1])
        message.channel.send({ embeds: [mute] });

    client.channels.cache.get("984143284769288272").send(`${message.member} ${mutekisi} adlı kullanıcıya ${mutezaman} süresi kadar mute attı`)
      setTimeout(function() {
        mutekisi.roles.remove(muterol.id);
        let öh = db.get(`mute_${mutekisi.id}`)
        if(öh === null) return
        db.delete(`mute_${mutekisi.id}`)
        message.channel.send(`<@${mutekisi.id}> kullanıcısının mutelenme süresi sona erdi!`);
        client.channels.cache.get("984143284769288272").send(`${message.member} ${mutekisi} mute kalktı`)

      }, ms(mutezaman));
}};


module.exports.config = {
    name: "mute",
    desc: "mute",
    aliases: ["mute"]
}