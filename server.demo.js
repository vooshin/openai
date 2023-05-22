const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const KEY = process.env.OPEN_AI_API_KEY;
const configuration = new Configuration({
  apiKey: KEY,
});
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5051;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAIApi(configuration);

const history = [];
const histort2 = [];
const getOpenAIResponseMain = async (data, prompt) => {
  try {
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

    //   saveText({ x: prompt, y: response, name: fileName });

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
};
const getOpenAIResponseTemp = async (data, prompt) => {
  try {
    const content = `${prompt}`;
    histort2.push({
      role: "user",
      content: content,
    });
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: histort2,
    });
    const response = completion.data.choices[0].message.content;

    //   saveText({ x: prompt, y: response, name: fileName });

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
};

app.post("/main", async (req, res) => {
  const data = req.body.data;
  const prompt = req.body.prompt;
  const response = await getOpenAIResponseMain(data, prompt);
  return res.json(response);
});
app.post("/temp", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await getOpenAIResponseTemp(prompt);
  return res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
