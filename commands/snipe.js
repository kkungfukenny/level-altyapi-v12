const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    const msg = client.snipes.get(message.channel.id);
    if (!msg) return message.reply("No recently deleted messages!");

    const embed = new MessageEmbed()
        .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setDescription(msg.content);

    if (msg.image) embed.setImage(msg.image);

    message.channel.send(embed);
}

module.exports.help = {
    name: "snipe",
    description: "Wiew a recently deleted message"
}

module.exports.requirements = {
    ownerOnly: false,
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: []
}