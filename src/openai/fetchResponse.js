const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const KEY = process.env.OPEN_AI_API_KEY;
const configuration = new Configuration({
  apiKey: KEY,
});
const openai = new OpenAIApi(configuration);
const { saveText } = require("../../utilities/helpers");

module.exports = {
  getOpenAIResponse: async (data, prompt, fileName) => {
    try {
      const history = [];
      const content = `${prompt} data:${JSON.stringify(data)}`;
      history.push({
        role: "user",
        content: content,
      });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: history,
      });
      const response = completion.data.choices[0].message.content;

      saveText({ x: prompt, y: response, name: fileName });

      return {
        status: true,
        response: response,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error: error,
      };
    }
  },
  handelMultipleData: async (data, prompt, fileName) => {
    try {
      const history = [];
      const content = `${prompt} data:${JSON.stringify(data)}`;
      history.push({
        role: "user",
        content: content,
      });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: history,
      });
      const response = completion.data.choices[0].message.content;

      saveText({ x: prompt, y: response, name: fileName });

      return {
        status: true,
        response: response,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error: error,
      };
    }
  },
};
