const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const KEY = process.env.OPEN_AI_API_KEY;
const configuration = new Configuration({
  apiKey: KEY,
});
const path = require("path");
const { REVIEWS } = require("../data/orderDetailsData");
const openai = new OpenAIApi(configuration);
const fs = require("fs");
const { getMultiLabel } = require("./multilable");
const { stringToJSON } = require("../utilities/helpers");
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
  getSentimentOfReview: async (data) => {
    const final_response = [];
    const final_reviews = data ? data : REVIEWS.slice(0, 10);

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
  getSentimentOfReviewWithMultiLabel: async () => {
    const final_response = [];
    const final_response2 = [];
    const final_reviews = REVIEWS

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
        y: response?.response,
        name: "sentiment",
      });

      const sentiment = stringToJSON(response?.response);
      console.log("sentiment :" + i + "\n", sentiment);
      if (sentiment.status) {
        const d = sentiment.response;
        const { isNegative } = d;
        if (isNegative) {
          const multi_label_json = await getMultiLabel(order_feedback);

          saveText({
            x: order_feedback,
            y: multi_label_json,
            name: "multi_label",
          });

          final_response2.push({
            delivery_uuid: final_reviews[i].delivery_uuid,
            listing_id: final_reviews[i].listing_id,
            channel: final_reviews[i].channel,
            restaurant_id: final_reviews[i].restaurant_id,
            order_ratings: final_reviews[i].order_ratings,
            review: order_feedback,
            sentiment: d,
            multi_label: multi_label_json,
          });
        }
      }

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

    return final_response2;
  },
  getSentimentOfReviewWithMultiLabel2: async () => {
    const final_response = [];
    const final_response2 = [];
    const final_reviews = REVIEWS

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
        y: response?.response,
        name: "sentiment",
      });

      const sentiment = stringToJSON(response?.response);
      console.log("sentiment :" + i + "\n", sentiment);
      if (sentiment.status) {
        const d = sentiment.response;
        const { isNegative } = d;
        if (isNegative) {
          const multi_label_json = await getMultiLabel(order_feedback);

          saveText({
            x: order_feedback,
            y: multi_label_json,
            name: "multi_label",
          });

          const multi_label_x = stringToJSON(multi_label_json);

          if (multi_label_x.status) {
            final_response2.push({
              delivery_uuid: final_reviews[i].delivery_uuid,
              listing_id: final_reviews[i].listing_id,
              channel: final_reviews[i].channel,
              restaurant_id: final_reviews[i].restaurant_id,
              order_ratings: final_reviews[i].order_ratings,
              review: order_feedback,
              sentiment: d,
              multi_label: multi_label_x.response,
            });
          }
        }
      }

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

    return final_response2;
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
