const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { data: REVIEWS } = require("../temp_data");
const KEY = process.env.OPEN_AI_API_KEY;
const configuration = new Configuration({
  apiKey: KEY,
});
const openai = new OpenAIApi(configuration);
const conversationHistory = [];
const PORT = process.env.PORT || 5051;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DEFAULT_PROMPT = `Do a sentiment analysis in the provided message if it is negative or nutral, can you do a multi-label classification on these labels Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue, Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue, Out of Stock Issue, Foreign Object Issue. Please provide a percentage matching of each labels and make it into JSON format and the response should be under 4000 tokens`;

const runChat = async ({ message, data }) => {
  const userContent = `${message} ${data ? "data:" + data : ""}`;
  conversationHistory.push({
    role: "user",
    content: userContent,
  });
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversationHistory,
  });
  const response = completion.data.choices[0].message.content;
  return response;
};

const singleRunChat = async ({ message, data }) => {
  const userContent = `${message} ${data ? "data:" + data : ""}`;
  console.log("userContent >>>>", userContent.length);
  const history = [];
  history.push({
    role: "user",
    content: userContent,
  });

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history,
  });
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
  const message = DEFAULT_PROMPT;
  //   contains only negative reviews
  const data = REVIEWS.filter((item) => item.rating <= 4);
  const response = await multipleChatHelper({
    message: `${message}`,
    data: data,
  });

  res.json({
    message: "Hello World",
    data: response,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function saveText({ message, ai, name }) {
  const default_name = name ?? "data";
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/reviews", `${default_name}.txt`),
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
      path.join(path.resolve("./"), "/reviews", `${"error"}.txt`),
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
