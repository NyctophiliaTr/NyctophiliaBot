module.exports = {
    async run (client, message, args) {
        const Discord = require("discord.js");

        const user = message.mentions.users.first()
        if (user) {
            const embed = new Discord.MessageEmbed()
            .setTitle('Avatarınız aşağıda bulunmaktadır.')
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            message.channel.send({ embeds: [embed] })
        } else {
            const embed = new Discord.MessageEmbed()
        .setTitle('Avatarınız aşağıda bulunmaktadır.')
        .setImage(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.channel.send({ embeds: [embed] })
        }
    }
}

module.exports.config = {
    name: "avatar",
    desc: "avatar komutu",
    aliases: ["avatar", "av"]
}