# DiscordGPT

![img](https://img.shields.io/codacy/grade/333027d39cce490e83ac03cf5f0f1e9d?style=for-the-badge&logo=codacy)
![npm](https://img.shields.io/npm/v/discordgpt?style=for-the-badge)

## About

This project is based on the power of [OpenAI](https://beta.openai.com)'s Chat-GPT functionality, a state-of-the-art language model that has been trained on a massive amount of text data.

## discordGPT Installation

```bash
$ npm install discordgpt
```

## Usage

DiscordGPT can implement AI features into your Discord bot by just a few simple steps.

1. Create an OpenAI API key [here](https://beta.openai.com/account/api-keys) if you do not have an api key.

2. Install [discordGPT](#discordGPT-Installation)
3. Implement this example code:

```javascript
const discordGPT = require("discordgpt");
const secret = require("../config.json");
const prompt = ""; // Prompt to ask the AI

const AI = new discordGPT({
  apiKey: secret, // Your OpenAI API key
  textAccuracy: "", // Between 0 to 2
});

const results = AI.generateText("prompt"); //generateText function.
console.log(results);
```

Note that the generateText() function only accepts string type.

4. Make an config.json (or an .env file) and put your OpenAI API key there.

```bash
{
 secret: "API_KEY_HERE"
}
```

5. Finally, you can place that in a discord bot command.

Example:

```js
const { SlashCommandBuilder } = require("discord.js");
const { discordGPT } = require("discordgpt");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask-gpt")
    .setDescription("Generate a AI response!")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The text to input to the AI.")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const prompt = interaction.options.getString("prompt");

    const AI = new discordGPT({
      apiKey: secret,
      textAccuracy: "0.8",
    });

    try {
      const text = await AI.generateText(prompt);

      await interaction.deferReply();
      await wait(3000);
      await interaction.editReply({ content: text });
    } catch (e) {
      console.log(e);
    }
  },
};
```

## Planned addons

(Partially done) Modifiers of AI response text (temperature, presence_penalty, frequency_penalty) \
OpenAI's image API
