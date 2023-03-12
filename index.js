const { Configuration, OpenAIApi } = require("openai");

class discordGPT {
  constructor(options) {
    this.options = options;
    this.textAccuracy = options.textAccuracy;
    this.apiKey = options.apiKey;
  }

  async generateText(message) {
    const textAccuracy = this.options.textAccuracy;
    const textAccuracyNumber = Number(this.options.textAccuracy);
    if (typeof textAccuracy !== "string") {
      throw new TypeError(
        "[discordGPT]: options.textAccuracy should be type String!"
      );
    } else if (
      !textAccuracy ||
      isNaN(textAccuracy) ||
      textAccuracyNumber > 2 ||
      textAccuracyNumber < 0
    ) {
      throw new RangeError(
        "[discordGPT]: options.textAccuracy should be more than or equal to 0 and less than or equal to 2!"
      );
    } else if (!message) {
      throw new Error("[discordGPT]: The prompt should contain a string!");
    } else {
      const configuration = new Configuration({
        apiKey: this.options.apiKey,
      });

      try {
        const temp = Number(textAccuracy);
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          temperature: temp,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        });

        return completion.data.choices[0].message.content;
      } catch (e) {
        if (e.response.status == 401) {
          throw new Error(`[discordGPT]: The API key provided is invalid!`);
        } else {
          throw new Error(`[discordGPT]: An error occurred. \n Details: ` + e);
        }
      }
    }
  }
}

module.exports = discordGPT;
