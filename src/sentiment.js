const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const KEY = process.env.OPEN_AI_API_KEY;
const configuration = new Configuration({
  apiKey: KEY,
});
const path = require("path");
const { REVIEWS } = require("../data/data");
const openai = new OpenAIApi(configuration);
const fs = require("fs");

const PROMPT = `Consider your expert in sentiment analysis. You are given a text and you need to return the sentiment of the text. The sentiment can be positive, negative or neutral. the desire output should be in form of json and it should be less then 4000 characters. response example: {
    positive: 0.5,
    negative: 0.2,
    neutral: 0.3
    isPositive: true,
    isNegative: false,
    isNeutral: false
}; 
review: `;


module.exports = {
  getSentimentOfReview: async () => {
    const final_response = [];
    const final_reviews = REVIEWS.filter(
      (item) => item.order_feedback != null && item.order_feedback.length > 3
    );

    for (let i = 0; i < final_reviews.length; i++) {
      const { order_feedback } = final_reviews[i];
      const response = await helper(order_feedback);

      console.log("response :" + i + "\n", response);

      if (!response.status) {
        saveText({
          x: order_feedback,
          y: response?.error,
          name: "sentiment_error",
        });
        continue;
      }

      saveText({
        x: order_feedback,
        y: response,
        name: "sentiment",
      });
      final_response.push({
        delivery_uuid: final_reviews[i].delivery_uuid,
        listing_id: final_reviews[i].listing_id,
        channel: final_reviews[i].channel,
        restaurant_id: final_reviews[i].restaurant_id,
        order_ratings: final_reviews[i].order_ratings,
        review: order_feedback,
        response: response,
      });
    }

    return final_response;
  },
};

async function helper(text) {
  try {
    const history = [];
    const content = `${PROMPT} ${text}`;
    history.push({
      role: "user",
      content: content,
    });
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: history,
    });
    const response = completion.data.choices[0].message.content;
    return {
      status: true,
      response: response,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
}

function saveText({ x, y, name }) {
  const default_name = name ?? "data";
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/demo", `${default_name}.txt`),
      `message:${x}\n ai:${y}\n`,
      "UTF8"
    );
    console.log("saved");
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      error: error,
    };
  }
}
