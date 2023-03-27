const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { BotIcon, BotName, OpenAIKey, MadeBy } = require('../Database/Information.json');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: OpenAIKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name:"chat-completion",
    data: new SlashCommandBuilder()
    .setName("chat-completion")
    .setDescription("Generates a answer/response from the provided query")
    .addStringOption(option => option.setName('query').setDescription('Query to Answer').setRequired(true)),

run: async (client, interaction) => {

    const query = interaction.options.getString('query');

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: query,
    }).catch(error => {
      console.log(error);
        if(completion.status === 400){
          const embed = new EmbedBuilder()  
          .setAuthor({ name: BotName })
          .setThumbnail(BotIcon)
          .setDescription(`${completion.data.error.message}`)
          return interaction.followUp({ embeds: [embed] }) 
        }
      })
if(completion.status !== 200) { return } else {
console.log(completion.data)
const embed = new EmbedBuilder()  
.setAuthor({ name: BotName })
.setDescription(MadeBy)
.setThumbnail(BotIcon)
.addFields({name: "Response", value: `${completion.data.choices[0].text}...`})
.addFields({name: "Text Cut Short?", value: `We are limited on how much it can respond with.`})
return interaction.followUp({ embeds: [embed] })
}
}
}