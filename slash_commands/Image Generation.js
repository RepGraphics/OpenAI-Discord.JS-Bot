const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { BotIcon, BotName, OpenAIKey, MadeBy } = require('../Database/Information.json');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: OpenAIKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name:"image-generation",
    data: new SlashCommandBuilder()
    .setName("image-generation")
    .setDescription("Generates a random image from the provided query")
    .addStringOption(option => option.setName('query').setDescription('Image to generate').setRequired(true)),

run: async (client, interaction) => {

    const query = interaction.options.getString('query');

    const response = await openai.createImage({
        prompt: query,
        n: 1,
        size: "1024x1024",
      });

const embed = new EmbedBuilder()  
.setAuthor({ name: BotName })
.setDescription(MadeBy)
.setThumbnail(BotIcon)
.setImage(response.data.data[0].url)
return interaction.followUp({ embeds: [embed] })
}
}