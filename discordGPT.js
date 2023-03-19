const { Configuration, OpenAIApi } = require("openai");

class discordGPT {
  constructor(options) {
    this.options = options;
    this.imageSize = options.imageSize;
    this.apiKey = options.apiKey;
    this.textAccuracy = options.textAccuracy;
  }

  async generateImage(message) {
    const imageSize = this.options.imageSize;
    if (typeof imageSize !== "string") {
      throw new TypeError(
        "[discordGPT] - imageAPI: options.imageSize should be type String!"
      );
    } else if (
      !imageSize.toLowerCase().trim() === "large" ||
      !imageSize.toLowerCase().trim() === "medium" ||
      !imageSize.toLowerCase().trim() === "small"
    ) {
      throw new TypeError(
        "[discordGPT] - imageAPI: options.imageSize input should be large, medium or small!"
      );
    } else if (!message) {
      throw new Error(
        "[discordGPT] - imageAPI: The prompt should contain a string!"
      );
    } else {
      const imageConfiguration = new Configuration({
        apiKey: this.options.apiKey,
      });

      var finalImageSize;

      if (imageSize.toLowerCase().trim() === "small") {
        finalImageSize = "256x256";
      } else if (imageSize.toLowerCase().trim() === "medium") {
        finalImageSize = "512x512";
      } else if (imageSize.toLowerCase().trim() === "large") {
        finalImageSize = "1024x1024";
      }

      try {
        const imageAPI = new OpenAIApi(imageConfiguration);

        const response = await imageAPI.createImage({
          prompt: message,
          n: 1,
          size: finalImageSize,
        });
        return response.data.data[0].url;
      } catch (e) {
        if (e.response.status == 401) {
          throw new Error(
            `[discordGPT] - imageAPI: The API key provided is invalid!`
          );
        } else {
          throw new Error(
            `[discordGPT] - imageAPI: An error occurred. \n Details: ` + e
          );
        }
      }
    }
  }

  async generateText(message) {
    const textAccuracy = this.options.textAccuracy;
    const textAccuracyNumber = Number(this.options.textAccuracy);
    if (typeof textAccuracy !== "string") {
      throw new TypeError(
        "[discordGPT] - textAPI: options.textAccuracy should be type String!"
      );
    } else if (
      !textAccuracy ||
      isNaN(textAccuracy) ||
      textAccuracyNumber > 2 ||
      textAccuracyNumber < 0
    ) {
      throw new RangeError(
        "[discordGPT] - textAPI: options.textAccuracy should be more than or equal to 0 and less than or equal to 2!"
      );
    } else if (!message) {
      throw new Error(
        "[discordGPT] - textAPI: The prompt should contain a string!"
      );
    } else {
      const configuration = new Configuration({
        apiKey: this.options.apiKey,
      });

      try {
        const temp = Number(textAccuracy);
        const textAPI = new OpenAIApi(configuration);

        const completion = await textAPI.createChatCompletion({
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
          throw new Error(
            `[discordGPT] - textAPI: The API key provided is invalid!`
          );
        } else {
          throw new Error(
            `[discordGPT] - textAPI: An error occurred. \n Details: ` + e
          );
        }
      }
    }
  }
}

module.exports = discordGPT;
a
