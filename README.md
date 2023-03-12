# DiscordGPT

![npm](https://img.shields.io/npm/v/discordgpt?style=for-the-badge)

## About

This project is based on the power of [OpenAI](https://beta.openai.com)'s Chat-GPT functionality, a state-of-the-art language model that has been trained on a massive amount of text data.

## discordGPT Installation

```bash
$ npm install discordgpt
```

Warning: While this package is specifically developed to work with discord.js v14, there is no assurance that it will be compatible with either discord.js v13 or v12.

## Usage

DiscordGPT can implement AI features into your Discord bot by just a few simple steps.

1. Create an OpenAI API key [here](https://beta.openai.com/account/api-keys) if you do not have an api key.

2. Install [discordGPT](#discordGPT-Installation)

3. Implement code (refer to [Examples](#examples)):

### When using the generateText() function, it will only accept a string type as input and this input must include an "await" keyword.

4. Make an config.json (or an .env file) and put your OpenAI API key there.

### config.json

```bash
{
 secret: "API_KEY_HERE"
}
```

Your main file should look like this:

```js
const secret = require("../config.json");
const textGeneration = async () => {
  const prompt = ""; // Prompt to ask the AI

  const AI = new discordGPT({
    apiKey: secret, // Your OpenAI API key
    textAccuracy: "0.7", // Between 0 to 2
  });

  const text = await AI.generateText(prompt);
  console.log(text);
};
textGeneration();
```

### .env (needs package dotenv installed)

```bash
SECRET="API_KEY_HERE"
```

Main File (Place at the top of your file)

```js
require("dotenv").config();
const textGeneration = async () => {
  const prompt = ""; // Prompt to ask the AI

  const AI = new discordGPT({
    apiKey: process.env.SECRET, // Your OpenAI API key
    textAccuracy: "0.7", // Between 0 to 2
  });

  const text = await AI.generateText(prompt);
  console.log(text);
};
textGeneration();
```

5. Run the project and you are done!

## Examples:

```js
const { SlashCommandBuilder } = require("discord.js");
const { discordGPT } = require("discordgpt");
const secret = require("../config.json");
const wait = require("node:timers/promises").setTimeout;
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
      await interaction.deferReply();
      await wait(3000);
      await interaction.editReply({ content: "Please wait..." });
      const text = await AI.generateText(prompt);
      await interaction.followUp({ content: text });
    } catch (e) {
      console.log(e);
    }
  },
};
```

## Planned addons

(Partially done) Modifiers of AI response text (temperature, presence_penalty, frequency_penalty) \
OpenAI's image API
