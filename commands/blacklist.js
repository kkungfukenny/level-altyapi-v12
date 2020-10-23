module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
    if (!user) return message.reply("You must provide a user to blacklist or unblacklist");

    if (client.blacklist.includes(user.id)) {
        client.blacklist.splice(client.blacklist.indexOf(user.id));
        message.reply(`Successfully removed **${user.tag}** from blacklist!`);
    } else {
        client.blacklist.push(user.id);
        message.reply(`Successfully added **${user.tag}** to the blacklist`);
    }

    await client.db.set("blacklist", client.blacklist);
}

module.exports.help = {
    name: "blacklist",
    description: "Blacklist or unblacklist a user from your bot"
}

module.exports.requirements = {
    ownerOnly: true,
    userPerms: [],
    clientPerms: []
}