const { Configuration, OpenAIApi } = require("openai");

class discordGPT {
  constructor(options) {
    this.textAccuracy = options.textAccuracy;
    this.apiKey = options.apiKey;
  }

  async generateText(message) {
    if (typeof options.textAccuracy !== "string") {
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
      } catch (e) {
        if (e.response.status == 401) {
          function APIError(errorMsg) {
            this.name = "APIError";
            this.message = errorMsg;
          }
          throw new APIError(`[discordGPT]: The API key provided is invalid!`);
        } else {
          throw new APIError(
            `[discordGPT]: An error occurred. \n Details: ` + e
          );
        }
      }
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: this.options.textAccuracy,
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
}

module.exports = discordGPT;
