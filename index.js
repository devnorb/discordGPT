const { Configuration, OpenAIApi } = require("openai");

class discordGPT {
  constructor(options) {
    this.apiKey = options.apiKey;
  }

  async generateText(message) {
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    return completion.data.choices[0].message.content;
  }
}

module.exports = discordGPT;
