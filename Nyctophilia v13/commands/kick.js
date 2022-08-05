module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");
        const ayarlar = require("../ayarlar.json");
        const prefix = ayarlar.prefix;
        
        let yetkili = message.member
        if(!yetkili.permissions.has("BAN_MEMBERS")) return message.reply("Yetkin yetmiyor")
    
        let atilacakkisi = message.mentions.members.first();
        if(!atilacakkisi) return message.reply("Kimi yasaklayacağım acaba?")
    
        message.guild.members.kick(atilacakkisi).catch(error => {
            return message.channel.send(`${user} bir sorun var`)
                });
                client.channels.cache.get("984143284769288272").send(`${yetkili} ${atilacakkisi} isimli kullanıcıyı attı`)
      return  message.channel.send(`${yetkili} istediğin kişiyi attım!`)

}};


module.exports.config = {
    name: "kick",
    desc: "kick",
    aliases: ["kick"]
}