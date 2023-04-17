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

const PROMPT = `Consider your expert in multi label classification.Consider the following labels for aspect classification: Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue, Staleness Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue,Missing Food Issue, Oiliness Issue, Out of Stock Issue, Foreign Object Issue. response should be in the form of json with each label as a key and the percentage matching as the value. Example:
{
  "quality_issue": 100,
  "quantity_issue": 0,
  "taste_issue": 100,
  "packaging_issue": 0,
  "delivery_issue": 0,
  "price_issue": 0,
  "cooking_issue": 100,
  "freshness_issue": 0,
  "staleness_issue": 0,
  "hardness_issue": 0,
  "spice_issue": 0,
  "temperature_issue": 0,
  "wrong_food_issue": 0,
  "hygiene_issue": 0,
  "missing_food_issue": 0,
  "oiliness_issue": 0,
  "out_of_stock_issue": 0,
  "foreign_object_issue": 0
}
review:


`;

module.exports = {
  getMultiLabelReview: async () => {
    const final_response = [];
    const final_reviews = REVIEWS.filter(
      (item) => item.order_feedback != null && item.order_feedback.length > 3
    );

    for (let i = 0; i < final_reviews.length; i++) {
      const { order_feedback } = final_reviews[i];
      const response = await helper(order_feedback);

      console.log("response :" + i + "\n", response);

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
  return response;
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
