const { MessageEmbed } = require("discord.js");
const functions = require("../structures/functions");

module.exports.run = (client, message, args) => {
    if (!args[0] || !args[1]) return message.reply("You must provide a keyword and page number!");
    const page = functions.pages(message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(args[0].toLowerCase())).map(m => m.user.tag), 5, args[1]);
    if (!page) return message.reply("This page doesn't exist!");

    return message.channel.send(new MessageEmbed()
        .setAuthor(`Results For ${args[0]}`, message.guild.iconURL())
        .setDescription(page.join("\n"))
        .setColor(0x4caf50)
    );
}

module.exports.help = {
    name: "search",
    description: "Search members in the server by a keyword"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}