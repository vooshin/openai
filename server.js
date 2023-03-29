const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const KEY = process.env.OPEN_AI_API_KEY;

const configuration = new Configuration({
  apiKey: KEY,
});
const openai = new OpenAIApi(configuration);
const conversationHistory = [];

const runner = async () => {
  const response = await openai.listModels();
  console.log(response);
  return response.data;
};

const runCommand = async () => {
  const response = await openai.createCompletion({
    engine: "gpt-3.5-turbo",
    prompt: "This is a test",
    maxTokens: 5,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ["\n", " Human:", " AI:"],
  });
  // console.log(response);
  return response.data;
};

const runChat = async ({ message, data }) => {
  conversationHistory.push({
    role: "user",
    content: `${message} ${
      data && typeof data === "object" && Object.keys(data).length > 0
        ? ` provided data:${JSON.stringify(data)}`
        : ""
    }`,
  });
  const completion = await openai.createChatCompletion({
    // gpt-3.5-turbo"
    model: "gpt-3.5-turbo",

    // messages: [{ role: "user", content: message }],
    messages: conversationHistory,
    // content:
    //   "You are an AI, you can only provide restaurant related information.",
  });
  // console.log(completion.data.choices[0].message);
  const response = completion.data.choices[0].message.content;
  return response;
};

app.get("/", async (req, res) => {
  const response = await runner();
  res.json({
    message: "Hello World",
    data: response,
  });
});

app.get("/run-test", async (req, res) => {
  const response = await runCommand();

  res.json({
    message: "Hello World",
    data: response,
  });
});
app.post("/give-insight", async (req, res) => {
  const message = req.body.message;
  const data = req.body.data.slice(0, 12);
  const response = await runChat({ message, data });

  res.json({
    message: "AI Buddy",
    data: response,
    old: conversationHistory,
  });
});

app.listen(3200, () => {
  console.log("Server running on port 3200");
});

function writeToFile() {
  fs.open(filepath, "r", function (fileExists, file) {
    if (fileExists) {
      fs.writeFile(filepath, JSON.stringify(prodDetail), (err) => {
        if (err) console.error(err);
        console.log("Data written");
      });
    } else {
      console.log("File already exists!");
    }
  });
}
