const { Configuration, OpenAIApi } = require("openai");
const ORDERS_DATA = require("./demo/orders");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// prompt for aspect-based sentiment analysis
// const promptAspect = `
// give some percentage of the feedback that are positive, negative and neutral for each of the aspect. \n
// consider these 15 aspects or labels to be tracked basis on the sentiment and the rating . The labels are: \n
// 1. Food Quality \n
// 2. Food Quantity \n
// 3. Food Taste \n
// 4. Food Packaging \n
// 5. Food Delivery & Timing \n
// 6. Food Price \n
// 7. Food Cooking \n
// 8. Food Freshness \n
// 9. Food Stalenes \n
// 10. Food Hardness \n
// 11. Food Spice \n
// 12. Food Temperature \n
// 13. Wrong Food \n
// 14. Food Hygiene \n
// 15. Missing Food \n
// 16. Food Oiliness \n
// 17. Food Out of Stock \n
// 18. Food Foreign Object \n
// json file contains all the feedback and ratings for each of order. \n
// `;

const promptAspect = `
First do a sentiment analysis on the feedback, \n
then for the negative or neutral sentiment reviews run a aspect label based classification \n
on the text feedback and the rating provided in the data for classification \n
Consider these 18 labels to be classified on the feedback and the rating provide in the json file. The labels are:\n 
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
`;
const promptAspect2 = `Perform a Step by Step process for the review and rating, \n
Step 1: Perform a Sentiment Analysis on the Feedback provided  \n
Step 2: Separate the review on the basis of sentiment \n
Step 3:  If the review is negative or neutral then perform a aspect based classification considering the following labels as aspect. \n
The labels are Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
Step 4: For each label make a percentage of aspect labels matching in the review\n
Step 5: Create a json with each label as a key and the percentage matching as the value. \n
`;

const promptSales = `Consider yourself as a predictive analytics by looking different orders, you can get a better idea of what your customers are looking for, also try to give some finance related insights, like how much money you can make from a particular order, or how much money you can save by not delivering a particular order. also ry to pridic
`;

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
    content: `${message + promptSales} ${
      data && typeof data === "object" && Object.keys(data).length > 0
        ? ` provided data:${JSON.stringify(data.slice(0, 1))}`
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
  const data = req.body.data;
  const response = await runChat({
    message: `
  ${message}+${promptAspect}
  `,
    data,
  });

  res.json({
    message: "AI Buddy",
    data: response,
    old: conversationHistory,
  });
});
app.post("/give-sales", async (req, res) => {
  const message = req.body.message;
  // const data = req.body.data;
  const response = await runChat({
    message: `${message}+${promptSales}`,
    data: ORDERS_DATA,
  });

  res.json({
    message: "AI Buddy",
    data: response,
    old: conversationHistory,
  });
});

app.post("/give-reviews", async (req, res) => {
  const message = req.body.message;
  const data = req.body.data;
  const response = await runChat({
    message: `${message + promptAspect}`,
    data: data,
  });

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
