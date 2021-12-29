const Discordjsh = require("discordjsh");
const Discord = require("discord.js");
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const Config = module.exports = {
    name: "send",
    description: "Sends a link to the JSON emoji page.",
    /**
     * 
     * @param {Discord.CommandInteraction} interaction 
     * @param {Discord.Client} client 
     */
    async execute(interaction, client) {
        if(interaction.user.id !== "820465204411236362") return;
        const chan = interaction.options.getChannel("channel") || interaction.channel;
        let url
        if(interaction.guild.id === "863457284456972298") url = "1"
        else if(interaction.guild.id === "870893923684466708") url = "2"
        else if(interaction.guild.id === "887143380990185512") url = "3"
        else if(interaction.guild.id === "917201080268488796") url = "4"
        else if(interaction.guild.id === "888151815869313024") url = "slashr"
        await chan.send({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`The Emoji JSON for this server for this server can be found on [the site](https://json.trtle.xyz/).`)
                .setTitle(`<:BotDeveloper:911666363817414706> Emoji JSON`)
            ],
            components: [
                {
                    type: 1,
                    components: [
                        new Discord.MessageButton()
                        .setStyle("LINK")
                        .setEmoji("<:link:863826801641259058>")
                        .setLabel(`Direct Link`)
                        .setURL(`https://json.trtle.xyz/#/${url}`)
                    ]
                }
            ]
        })
    }
}

module.exports.data = new Discordjsh.commandBuilder()
    .setName(Config.name)
    .setDescription(Config.description)
    .addChannelOption(e => e.setName("channel").setDescription(`The channel.`))