module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");
        const ayarlar = require("../ayarlar.json");
        const prefix = ayarlar.prefix;
        
        let yetkili = message.member
        if(!yetkili.permissions.has("BAN_MEMBERS")) return message.reply("Yetkin yetmiyor")
    
        let atilacakkisi = message.mentions.members.first();
        if(!atilacakkisi) return message.reply("Kimi yasaklayacağım acaba?")
    
        message.guild.members.ban(atilacakkisi).catch(error => {
            return message.channel.send(`${user} bir sorun var`)
                });
                client.channels.cache.get("984143284769288272").send(`${yetkili} ${atilacakkisi} isimli kullanıcıyı yasakladı`)
      return  message.channel.send(`${yetkili} istediğin kişiyi yasakladım!`)

}};


module.exports.config = {
    name: "ban",
    desc: "ban",
    aliases: ["ban"]
}