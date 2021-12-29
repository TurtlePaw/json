const Discordjsh = require("discordjsh");
const Discord = require("discord.js");
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const Config = module.exports = {
    name: "generate",
    description: "Re-generates the emoji JSON pages.",
    devOnly: true,
    /**
     * 
     * @param {Discord.CommandInteraction} interaction 
     * @param {Discord.Client} client 
     */
    async execute(interaction, client) {
        let timeNow = Date.now();
        client.emit("generate", async (s) => {
            let timeTook = millisToMinutesAndSeconds(Math.round(Date.now() - timeNow));
            if (s == true) {
                await interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setTitle(`<:checkmark_d:925583512118120507> Created`)
                            .setDescription(`The JSON has been created. (Took ${timeTook}s)`)
                            .setColor("BLURPLE")
                    ],
                    components: [
                        {
                            type: 1,
                            components: [
                                new Discord.MessageButton()
                                    .setLabel("Go to page")
                                    .setStyle("LINK")
                                    .setURL(`https://json.trtle.xyz/`)
                            ]
                        }
                    ],
                    ephemeral: true
                })
            } else {
                await interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setTitle(`<:xmark_d:925583718402359346> An error happend...`)
                            .setDescription(`The JSON has _not_ been created! (Took ${timeTook}s)`)
                            .setColor("BLURPLE")
                    ],
                    components: [
                        {
                            type: 1,
                            components: [
                                new Discord.MessageButton()
                                    .setLabel("Go to page anyway")
                                    .setStyle("LINK")
                                    .setURL(`https://json.trtle.xyz/`)
                            ]
                        }
                    ],
                    ephemeral: true
                })
            }
        })
    }
}

module.exports.data = new Discordjsh.commandBuilder()
    .setName(Config.name)
    .setDescription(Config.description)