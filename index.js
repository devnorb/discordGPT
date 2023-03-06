const { Configuration, OpenAIApi } = require("openai");

class discordGPT {
  constructor(options) {
    this.textAccuracy = options.textAccuracy;
    this.apiKey = options.apiKey;
  }

  async generateText(message) {
    if (!options.textAccuracy || options.textAccuracy == null) {
      options.textAccuracy = "1";
    } else if (typeof options.textAccuracy !== "string") {
      throw new TypeError(
        "[discordGPT]: options.textAccuracy should be type String!"
      );
    } else if (options.textAccuracy > 2 || options.textAccuracy < 0) {
      throw new RangeError(
        "[discordGPT]: options.textAccuracy should be less than or equal to 0 and more than or equal to 2!"
      );
    } else {
      const configuration = new Configuration({
        apiKey: this.apiKey,
      });

      try {
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          temperature: options.textAccuracy,
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
