// API DISCORD V12
// Nosso Servidor Discord: https://discord.gg/cvBFQWczRt

const Discord = require("discord.js");
const app = new Discord.Client({ disableMentions: 'everyone' });
const Canvas = require("canvas");
const fetch = require("node-superfetch")
const token = "Seu Token bot";
const prefix = "?";

app.on("ready", () => {
    console.log(`Estou online em ${app.guilds.cache.size} Servidores e ${app.users.cache.size} Users.`)
})

app.on("guildMemberAdd", async Member =>{

    const Servidor = Member.guild;
    const canvas = Canvas.createCanvas(800,300);
    const ctx = canvas.getContext("2d");
    const x = canvas.width / 2;
    const canal = Servidor.channels.cache.get("ID CHANNEL");
    
    let fundo = await Canvas.loadImage("https://images2.alphacoders.com/101/thumb-1920-1014882.jpg");
    ctx.drawImage(fundo,0,0,canvas.width,canvas.height);

    const {body: a} = await fetch.get(Member.user.displayAvatarURL({format: "jpg"}));
    let avatar = await Canvas.loadImage(a);
    ctx.drawImage(avatar,280,40,230,150);

    let borda = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/581170733565214731/809898979600236544/bemvindo.png`);
    ctx.drawImage(borda,0,0,canvas.width,canvas.height);

    const user = Member.user.username;
    ctx.textAlign = "center";
    ctx.font = '53px Helvetica';
    ctx.fillStyle = "#ff00a0";
    ctx.fillText(`${user}`,x,265)

    const bemvindo = new Discord.MessageAttachment(canvas.toBuffer(),"bemvindo.png")

    canal.send(`Olá ${Member.user}, seja bem-vindo(a) ao ${Servidor.name}`,bemvindo)
})

app.on("message", async function (msg){

	let command = msg.content.toLowerCase().split(' ')[0];
     command = command.slice(prefix.length)

     if(command === "ping"){
         const m = await msg.channel.send("ping? ...")
     
         m.edit(`**:ping_pong:  ${m.createdTimestamp - msg.createdTimestamp} ms **`)

        }

   

}) 

app.login(token)