const Discord = require('discord.js');
const fs = require('fs');
const { Client, MessageEmbed } = require('discord.js')
const db = require('quick.db');
const ms = require("ms");

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});

client.commands;
client.prefix = "!"

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.commands = await setCommands()
  client.user.setActivity('My Coder !･Rubn#1943')
});

client.on('message', message => {
  if (message.content.startsWith('oylama')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Oylama yapmak için YÖNETİCİ rolüne sahip olmalısın.');
    if (!botmesajı) return message.reply('Oylamanın ne olacağını yazmadınız.');
    message.delete(message.author)
    const embed = new Discord.MessageEmbed()
    .setTitle('OYLAMA')
    .setDescription(botmesajı)
    .setFooter('Nyctophilia BOTU');
    message.channel.send({ embeds: [embed] }).then( embedMessage => {
      embedMessage.react("✔️")
      embedMessage.react("❌")
    })
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'kurallar') {
    const kanal = new Discord.MessageEmbed()

    .setTitle('KURALLAR')
    .addField('Lütfen küfür, argo ve kırıcı kelimeler kullanmayalım.', `Cezası Mute`)
    .addField('Yasadışı konular hakkında konuşmayalım.', `Cezası Mute`)
    .addField('Kimsenin kişisel bilgilerini paylaşmayın!', `Cezası Ban`)
    .addField('Spam, flood, kesinlikle yasaktır!', `Cezası Mute`)
    .addField('Her sunucuda olduğu gibi reklam yapmak yasaktır.', `Cezası Ban`)
    .addField('Din, dil, ırk ayrımı yapmayın, herkesin eşit olduğunu sakın unutmayın.', `Cezası Ban`)
    .addField('Kan, vahşet ve Cinsellik içeren görseller paylaşmayın.', `Cezası Ban`)
    .setAuthor('X OCAĞI Discord Sunucusu')
    .setColor("RED")
    message.channel.send({ embeds: [kanal] })  }
});

client.on("guildMemberAdd", member => {
  
    try {
      let kontrol = db.get(`mute_${member.id}`)
      if(kontrol === "mute") return member.roles.add("825816517760253972")
      let kimlik = db.get(`jail_${member.id}`)
      if(kimlik === "jail") return member.roles.add("999201668694540328")
    let role = member.guild.roles.cache.find(role => role.name === 'Üye')
    member.roles.add(role);
  } catch(e) {
    console.log(e)
  }
  });

client.on('guildMemberAdd', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '🎉hoş-geldiniz');
  let kontrol = db.get(`mute_${member.id}`)
  if(kontrol === "mute") return member.roles.add("825816517760253972")
  let kimlik = db.get(`jail_${member.id}`)
  if(kimlik === "jail") return member.roles.add("999201668694540328")
  girişçıkış.send(`Aramıza hoşgeldin, ${member} `);
});

client.on('guildMemberRemove', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '👋elveda');
  girişçıkış.send(` ${member} Aramızdan ayrıldı, tekrar görüşmek dileğiyle :cry: `);
});


client.on('message', msg => {
    if (msg.content.toLowerCase()  === 'sa') {
      msg.reply('Aleyküm Selam, Hoş Geldin');
    }
  });


async function setCommands() {
    commandFiles = fs.readdirSync('./commands')
    let commands = new Discord.Collection();
    commandFiles?.forEach((v, i) => {
        let file = require(`./commands/${v}`)
        commands.set(v, {
            name: file.config.name,
            desc: file.config.desc,
            aliases: file.config.aliases,
            run: file.run  
        })   
    })

    return commands;
}

client.on("message", (message) => {
    if  (
        message.content.startsWith(client.prefix) && 
        (message.content.split(' ')[0] != client.prefix && message.content != client.prefix) &&
        client.commands.find(v => (v.name == (message.content.split(' ')[0].replace("!", "") || message.content.replace("!", ""))) || (v.aliases.includes(message.content.split(' ')[0].replace("!", "") || message.content.replace("!", ""))))
    ) {
        let command = client.commands.find(v => (v.name == (message.content.split(' ')[0].replace("!", "") || message.content.replace("!", ""))) || (v.aliases.includes(message.content.split(' ')[0].replace("!", "") || message.content.replace("!", ""))))

        args = message.content.split(" ")
        args = args.slice(1, args.length) 
        command.run(client, message, args)
    }
})

client.on('message', message => {
  let hmm =  db.get(`engelleme_${message.author.id}`)
  if(hmm === "engelleme") return db.delete(`engelleme_${message.author.id}`)
 let neden =  db.get(`afknedeni_${message.author.id}`)
 let afk = db.get(`afk_${message.author.id}`)
 if(afk === "afk") {
  message.reply(`Artık afk değilsin`)
  db.delete(`afk_${message.author.id}`)
  db.delete(`afknedeni_${message.author.id}`)
 }
 const user = message.mentions.users.first()
 
 if(!user) return 
 let affk = db.get(`afk_${user.id}`)
 let nedennn =  db.get(`afknedeni_${user.id}`)
   if(affk === "afk") {
    return message.reply(`${nedennn} nedeniyle afk`)
  }
 
})

client.login('OTg0MTMxMzM3NDYyMTIwNTE5.G6JjcK.rt0eLjSSkpucXHJ-430LCAAWeRjuhrSzIfc4sg');