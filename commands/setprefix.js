module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply("You must specify a new prefix!");
    const prefix = args[0].toLowerCase();
    
    await client.db.set(`prefix-${message.guild.id}`, prefix);
    client.prefix[message.guild.id] = prefix;

    return message.reply(`Successfully changed prefix to: \`${prefix}\``);  
}

module.exports.help = {
    name: "setprefix",
    description: "Set a custom prefix in the current server"
}

module.exports.requirements = {
    ownerOnly: false,
    userPerms: ["MANAGE_GUILD"],
    clientPerms: []
}