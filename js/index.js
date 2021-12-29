const Discord = require("discord.js");
const jsh = require("discordjsh");
const fs = require("fs");
const { clientID, guildID, token } = require("./config.json");
const SimpleGit = require("simple-git");
const Github = SimpleGit.default();

const ClientBuilder = new jsh.Client({
    token,
    clientID,
    testGuildID: guildID
});

ClientBuilder.setCommandsDir("./js/commands");
const Client = ClientBuilder.create({
    intents: ["GUILDS"]
});

Client.on("ready",  () => {
    console.log(Client.generateInvite({
        scopes: ["bot", "applications.commands"],
        permissions: 'ADMINISTRATOR'
    }))
});
function parseEmoji(emoji){
    return `"${emoji.name}": "${emoji}"`
}
function Emojify(list){
    list = list.slice(0, list.lastIndexOf(","));
    return list;
}
Client.on("generate", async (execute) => {
    try{
        await fs.writeFileSync("./1.md", `# 1: Random Emojis\n\`\`\`json\n${Emojify(await (await Client.guilds.cache.get("863457284456972298").emojis.fetch()).map(e => parseEmoji(e)).join(",\n"))}\n\`\`\``);
        await fs.writeFileSync("./2.md", `# 2: [Remix Icons](https://remixicon.com/)\n\`\`\`json\n${Emojify(await (await Client.guilds.cache.get("870893923684466708").emojis.fetch()).map(e => parseEmoji(e)).join(",\n"))}\n\`\`\``);
        await fs.writeFileSync("./3.md", `# 3: [Discord App](https://discord.com/app)\n\`\`\`json\n${Emojify(await (await Client.guilds.cache.get("887143380990185512").emojis.fetch()).map(e => parseEmoji(e)).join(",\n"))}\n\`\`\``);
        await fs.writeFileSync("./4.md", `# 4: Misc\n\`\`\`json\n${Emojify(await (await Client.guilds.cache.get("917201080268488796").emojis.fetch()).map(e => parseEmoji(e)).join(",\n"))}\n\`\`\``);
        await fs.writeFileSync("./slashr.md", `# 5: Slashr Emojis ([Website/Dashboard](https://slashr.xyz/) & [Bot](https://slashr.xyz/invite)\n\`\`\`json\n${Emojify(await (await Client.guilds.cache.get("888151815869313024").emojis.fetch()).map(e => parseEmoji(e)).join(",\n"))}\n\`\`\``);
        execute(true)
        await Github.commit("Build Pages (Auto)")
        await Github.push("origin", "master");
        console.log("Push to github");
    } catch(e){
        console.log(e)
        execute(false)
    }
});
setTimeout(() => {
    Client.emit("generate", (e) => console.log(`Generated Emojis. Res: ${e}`));
}, 4000);