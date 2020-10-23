const { owners } = require("../config");

module.exports = async (client, message) => { 
    if (!message.guild || message.author.bot) return;
    if (client.blacklist.includes(message.author.id));

    const levelInfo = await client.db.get(`level-${message.guild.id}-${message.author.id}`, {
        level: "1",
        xp: "0",
        totalXp: "0"
    });

    const genereatedXp = Math.floor(Math.random() * 16);
    levelInfo.xp += genereatedXp;
    levelInfo.totalXp += genereatedXp;

    if (levelInfo.xp >= levelInfo.level * 40){
        levelInfo.level++;
        levelInfo.xp = 0;
        message.reply(`You are now level **${levelInfo.level}**!`);
    }

    await client.db.set(`level-${message.guild.id}-${message.author.id}`, levelInfo);


    if (!client.prefix[message.guild.id]) {
        client.prefix[message.guild.id] = await client.db.get(`prefix-${message.guild.id}`, client.prefix["default"]);
    }

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(client.prefix[message.guild.id].length).toLowerCase();
    const cmd = client.commands.get(command);

    if (!message.content.toLowerCase().startsWith(client.prefix[message.guild.id])) return;

    if (!cmd) return;
    if (!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return

    if (cmd.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.reply("Only bot owner can use this command");

    if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`You must have the following permissions: ${missingPerms(message.member, cmd.requirements.userPerms)}`);

    if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`I am missing the following permissions: ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);

    cmd.run(client, message, args);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}