const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { ai_review_data } = require("./test");
const { prompts } = require("./testx");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const promptAspect = `
First do a sentiment analysis on the feedback, \n
then for the negative or neutral sentiment reviews run a multi-label classification \n
on the text feedback and the rating provided in the data for classification \n
Consider these 18 labels to be classified on the feedback and the rating which are as follows:\n 
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue. Give me the percentage of matching of reviews to labels \n
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

const promptOfReview = `Consider yourself as text classification model, you can classify the review on the basis of sentiment and aspect. \n
Consider the following labels for sentiment classification: \n
Positive, Negative, Neutral \n
Consider the following labels for aspect classification: \n
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
`;
const promptForMultipleReview = `Consider yourself as text classification model, you can classify the review on the basis of sentiment and aspect. \n
Consider the following labels for sentiment classification: \n
Positive, Negative, Neutral \n
Consider the following labels for aspect classification: \n
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
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
  const userContent = `${message} ${data ? "data:" + data : ""}`;
  console.log("userContent >>>>", userContent.length);
  conversationHistory.push({
    role: "user",
    // content: `${message} ${
    //   data && typeof data === "object" && Object.keys(data).length > 0
    //     ? ` provided data:${JSON.stringify(data.slice(0, 1))}`
    //     : ""
    // }`,
    content: userContent,
  });
  //  hold for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
const singleRunChat = async ({ message, data }) => {
  const userContent = `${message} ${data ? "data:" + data : ""}`;
  console.log("userContent >>>>", userContent.length);
  const history = [];
  history.push({
    role: "user",
    // content: `${message} ${
    //   data && typeof data === "object" && Object.keys(data).length > 0
    //     ? ` provided data:${JSON.stringify(data.slice(0, 1))}`
    //     : ""
    // }`,
    content: userContent,
  });
  //  hold for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const completion = await openai.createChatCompletion({
    // gpt-3.5-turbo"
    model: "gpt-3.5-turbo",

    // messages: [{ role: "user", content: message }],
    messages: history,
    // content:
    //   "You are an AI, you can only provide restaurant related information.",
  });
  // console.log(completion.data.choices[0].message);
  const response = completion.data.choices[0].message.content;
  return response;
};

const multipleChatHelper = async ({ message, data }) => {
  const response = [];

  try {
    console.log("total reviews >>>>>", data.length);
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        let result;

        try {
          result = await singleRunChat({
            message: `${message}`,
            data: data[i],
          });
        } catch (error) {
          console.log("error occured", data[i]);
          response.push({
            message: message + " data:" + data[i],
            ai_response: error,
          });
        }

        if (!result) continue;

        const r = {
          message: message + " data:" + data[i],
          ai_response: result,
        };

        saveText({
          message: message + " data:" + data[i],
          ai: result,
        });
        response.push(r);
        console.log("result >>>>", r);
      }
    } else {
      runChat({ message, data });
    }

    return response;
  } catch (error) {
    console.log("error >>>>");
    ErrorText(error);
    return response;
  }
};

app.get("/", async (req, res) => {
  const response = await runner();
  res.json({
    message: "Hello World",
    data: response,
  });
});

app.post("/run-chat", async (req, res) => {
  const message = req.body.message;
  const data = req.body.data;
  const response = await multipleChatHelper({
    message: `${message}`,
    data: data,
  });

  res.json({
    message: "Hello World",
    data: response,
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

app.get("/test", async (req, res) => {
  const response = ai_review_data;
  res.json({
    message: "Hello World",
    data: response.map((i) => i.ai_response),
  });
});

app.get("/test2", async (req, res) => {
  // const response = ai_review_data
  let finalOutput = "";

  for (let i = 0; i < prompts.length; i++) {
    // console.log(JSON.stringify(prompts[i]));
    finalOutput += JSON.stringify(prompts[i]) + " \n";
  }

  saveTextX({
    message: finalOutput,
    name: "prompts",
  });

  res.json({
    message: "Hello World",
    data: prompts,
  });
});

app.listen(3200, () => {
  console.log("Server running on port 3200");
});

function saveText({ message, ai, name }) {
  const default_name = name ?? "sample";
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/sample", `${default_name}.txt`),
      `message:${message}\n
      ai:${ai}\n
      `,
      "UTF8"
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
}
function saveTextX({ message, ai, name }) {
  const default_name = name ?? "sample";
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/sample", `${default_name}.txt`),
      `message:${message}\n
      ai:${ai}\n
      `,
      "UTF8"
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
}
function saveText({ message, ai, name }) {
  const default_name = name ?? "sample";
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/sample", `${default_name}.txt`),
      `message:${message}\n
      ai:${ai}\n
      `,
      "UTF8"
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
}
function ErrorText({ message, ai }) {
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/sample", `${"error"}.txt`),
      `message:${message}\n
      ai:${ai}\n
      `,
      "UTF8"
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
}
