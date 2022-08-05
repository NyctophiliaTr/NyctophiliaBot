module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");
        const ms = require("ms");
        const db = require('quick.db');
        const ayarlar = require("../ayarlar.json");
        const prefix = ayarlar.prefix;
        var mutelirolu = "Jail"
        if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.reply(`:warning: Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`);
      let jailkisi = message.mentions.users.first() || message.guild.members.cache.get(args[0])
      
      if (!jailkisi)
        return message.reply(
          `:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}jail <@kullanıcı> <1sn/1dk/1sa/1g>**`
        );
      if (jailkisi.permissions.has("MANAGE_MESSAGES"))
        return message.reply(
          `:warning: Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`${prefix}jail <@kullanıcı> <1sn/1dk/1sa/1g>\``
        );
      let muterol = message.guild.roles.cache.find(role => role.name == mutelirolu);
      if (!muterol) {
message.reply("Jail rolü yok") }

      let jailzaman = args[1]
        .replace(`sn`, `s`)
        .replace(`dk`, `m`)
        .replace(`sa`, `h`)
        .replace(`g`, `d`);
    
      if (!jailzaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}jail <@kullanıcı> <1sn/1dk/1sa/1g>\``);
      db.set(`jail_${jailkisi.id}`,"jail")

      await jailkisi.roles.add(muterol.id);
        let işlem = new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL())
        .setColor(0x00ae86)
        .setAuthor("İşlem : Jail")
        .setTimestamp()
        .addField("**Kullanıcı:**", `<@${jailkisi.id}>`)
        .addField("**Moderatör:**", `${message.member}`)
        .addField("**Süre:**", args[1])
        message.channel.send({ embeds: [işlem] });

      client.channels.cache.get("984143284769288272").send(`${message.member} ${jailkisi} adlı kullanıcıya ${jailzaman} süresince jail attı`)

      setTimeout(function() {
        jailkisi.roles.remove(muterol.id);
        db.delete(`jail_${jailkisi.id}`)
        message.channel.send(`<@${jailkisi.id}> kullanıcısının jail süresi sona erdi!`);
        client.channels.cache.get("984143284769288272").send(`${message.member} ${jailkisi} jail kalktı`)

      }, ms(jailzaman));
}};


module.exports.config = {
    name: "jail",
    desc: "jail",
    aliases: ["jail"]
}