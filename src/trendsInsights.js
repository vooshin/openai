const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const KEY = process.env.OPEN_AI_API_KEY;
const configuration = new Configuration({
  apiKey: KEY,
});
const openai = new OpenAIApi(configuration);
const fs = require("fs");
const path = require("path");
const PROMPT = `Consider your expert analysis. You are given a JSON object and you need to return the insights of the object. The insights can be such that we can use it to improve the product. the data is related to the food delivery industry/restaurant industry. The response should be in 30 words or less, consider this array of objects contains the sales/orders`;
const PROMPT_X_orders = `give me statistic insights of the orders data(consider orders_trends object as present selected date range data, call it as current period orders and other one as past period orders), like The response should be in 30 words or less, consider this array of objects contains the orders data day wise, make the response like im explaining the data to a restaurant owner/manager/business owner. don't call it orders_trends, call it current period orders and past period orders. if possible mention the percentage of increase/decrease in orders and date`;
const PROMPT_X_sales = `give me statistic insights of the sales data(consider orders_trends object as present selected date range data, call it as current period sales and other one as past period sales), like The response should be in 30 words or less, consider this array of objects contains the sales data day wise, make the response like im explaining the data to a restaurant owner/manager/business owner.  don't call it orders_trends, call it current period orders and past period orders. if possible mention the percentage of increase/decrease in orders and date`;

const orders_trends = {
  orders_trends: [
    {
      date: "2023-03-18",
      value: 61,
    },
    {
      date: "2023-03-19",
      value: 78,
    },
    {
      date: "2023-03-20",
      value: 38,
    },
    {
      date: "2023-03-21",
      value: 37,
    },
    {
      date: "2023-03-22",
      value: 48,
    },
    {
      date: "2023-03-23",
      value: 44,
    },
    {
      date: "2023-03-24",
      value: 49,
    },
    {
      date: "2023-03-25",
      value: 56,
    },
    {
      date: "2023-03-26",
      value: 60,
    },
    {
      date: "2023-03-27",
      value: 40,
    },
    {
      date: "2023-03-28",
      value: 37,
    },
    {
      date: "2023-03-29",
      value: 37,
    },
    {
      date: "2023-03-30",
      value: 47,
    },
    {
      date: "2023-03-31",
      value: 56,
    },
    {
      date: "2023-04-01",
      value: 38,
    },
    {
      date: "2023-04-02",
      value: 58,
    },
    {
      date: "2023-04-03",
      value: 37,
    },
    {
      date: "2023-04-04",
      value: 32,
    },
    {
      date: "2023-04-05",
      value: 42,
    },
    {
      date: "2023-04-06",
      value: 42,
    },
    {
      date: "2023-04-07",
      value: 45,
    },
    {
      date: "2023-04-08",
      value: 64,
    },
    {
      date: "2023-04-09",
      value: 36,
    },
    {
      date: "2023-04-10",
      value: 40,
    },
    {
      date: "2023-04-11",
      value: 39,
    },
    {
      date: "2023-04-12",
      value: 41,
    },
    {
      date: "2023-04-13",
      value: 40,
    },
    {
      date: "2023-04-14",
      value: 41,
    },
    {
      date: "2023-04-15",
      value: 48,
    },
    {
      date: "2023-04-16",
      value: 60,
    },
    {
      date: "2023-04-17",
      value: 41,
    },
  ],
  prev_orders_trends: [
    {
      date: "2023-02-15",
      value: 45,
    },
    {
      date: "2023-02-16",
      value: 55,
    },
    {
      date: "2023-02-17",
      value: 69,
    },
    {
      date: "2023-02-18",
      value: 58,
    },
    {
      date: "2023-02-19",
      value: 60,
    },
    {
      date: "2023-02-20",
      value: 39,
    },
    {
      date: "2023-02-21",
      value: 52,
    },
    {
      date: "2023-02-22",
      value: 39,
    },
    {
      date: "2023-02-23",
      value: 65,
    },
    {
      date: "2023-02-24",
      value: 68,
    },
    {
      date: "2023-02-25",
      value: 94,
    },
    {
      date: "2023-02-26",
      value: 84,
    },
    {
      date: "2023-02-27",
      value: 65,
    },
    {
      date: "2023-02-28",
      value: 57,
    },
    {
      date: "2023-03-01",
      value: 66,
    },
    {
      date: "2023-03-02",
      value: 61,
    },
    {
      date: "2023-03-03",
      value: 66,
    },
    {
      date: "2023-03-04",
      value: 62,
    },
    {
      date: "2023-03-05",
      value: 61,
    },
    {
      date: "2023-03-06",
      value: 59,
    },
    {
      date: "2023-03-07",
      value: 39,
    },
    {
      date: "2023-03-08",
      value: 51,
    },
    {
      date: "2023-03-09",
      value: 46,
    },
    {
      date: "2023-03-10",
      value: 70,
    },
    {
      date: "2023-03-11",
      value: 61,
    },
    {
      date: "2023-03-12",
      value: 71,
    },
    {
      date: "2023-03-13",
      value: 44,
    },
    {
      date: "2023-03-14",
      value: 32,
    },
    {
      date: "2023-03-15",
      value: 44,
    },
    {
      date: "2023-03-16",
      value: 56,
    },
    {
      date: "2023-03-17",
      value: 54,
    },
  ],
};

const sales_trends = {
  sales_trends: [
    {
      date: "2023-03-18",
      value: 1120.18,
    },
    {
      date: "2023-03-19",
      value: 1375.03,
    },
    {
      date: "2023-03-20",
      value: 726.69,
    },
    {
      date: "2023-03-21",
      value: 528.94,
    },
    {
      date: "2023-03-22",
      value: 736.41,
    },
    {
      date: "2023-03-23",
      value: 733.76,
    },
    {
      date: "2023-03-24",
      value: 846.46,
    },
    {
      date: "2023-03-25",
      value: 959.61,
    },
    {
      date: "2023-03-26",
      value: 1198.8,
    },
    {
      date: "2023-03-27",
      value: 616.3,
    },
    {
      date: "2023-03-28",
      value: 515.06,
    },
    {
      date: "2023-03-29",
      value: 714.82,
    },
    {
      date: "2023-03-30",
      value: 842.11,
    },
    {
      date: "2023-03-31",
      value: 728.99,
    },
    {
      date: "2023-04-01",
      value: 777.55,
    },
    {
      date: "2023-04-02",
      value: 1093.4,
    },
    {
      date: "2023-04-03",
      value: 525.27,
    },
    {
      date: "2023-04-04",
      value: 436.81,
    },
    {
      date: "2023-04-05",
      value: 706.47,
    },
    {
      date: "2023-04-06",
      value: 691.68,
    },
    {
      date: "2023-04-07",
      value: 691.77,
    },
    {
      date: "2023-04-08",
      value: 987.64,
    },
    {
      date: "2023-04-09",
      value: 599.65,
    },
    {
      date: "2023-04-10",
      value: 647.28,
    },
    {
      date: "2023-04-11",
      value: 501.24,
    },
    {
      date: "2023-04-12",
      value: 655.33,
    },
    {
      date: "2023-04-13",
      value: 819.86,
    },
    {
      date: "2023-04-14",
      value: 694.15,
    },
    {
      date: "2023-04-15",
      value: 878.38,
    },
    {
      date: "2023-04-16",
      value: 974.7,
    },
    {
      date: "2023-04-17",
      value: 525.27,
    },
  ],
  prev_sales_trends: [
    {
      date: "2023-02-15",
      value: 660.37,
    },
    {
      date: "2023-02-16",
      value: 861.08,
    },
    {
      date: "2023-02-17",
      value: 1111.96,
    },
    {
      date: "2023-02-18",
      value: 1015.72,
    },
    {
      date: "2023-02-19",
      value: 1029.2,
    },
    {
      date: "2023-02-20",
      value: 657.2,
    },
    {
      date: "2023-02-21",
      value: 887.26,
    },
    {
      date: "2023-02-22",
      value: 696.61,
    },
    {
      date: "2023-02-23",
      value: 1028.61,
    },
    {
      date: "2023-02-24",
      value: 1044.86,
    },
    {
      date: "2023-02-25",
      value: 1720.26,
    },
    {
      date: "2023-02-26",
      value: 1322.78,
    },
    {
      date: "2023-02-27",
      value: 1088.93,
    },
    {
      date: "2023-02-28",
      value: 840.44,
    },
    {
      date: "2023-03-01",
      value: 1135.05,
    },
    {
      date: "2023-03-02",
      value: 916.86,
    },
    {
      date: "2023-03-03",
      value: 994.72,
    },
    {
      date: "2023-03-04",
      value: 1329.95,
    },
    {
      date: "2023-03-05",
      value: 1122.17,
    },
    {
      date: "2023-03-06",
      value: 871.15,
    },
    {
      date: "2023-03-07",
      value: 668.51,
    },
    {
      date: "2023-03-08",
      value: 847.17,
    },
    {
      date: "2023-03-09",
      value: 797.17,
    },
    {
      date: "2023-03-10",
      value: 1205.94,
    },
    {
      date: "2023-03-11",
      value: 1152.56,
    },
    {
      date: "2023-03-12",
      value: 1377.44,
    },
    {
      date: "2023-03-13",
      value: 717.77,
    },
    {
      date: "2023-03-14",
      value: 651.98,
    },
    {
      date: "2023-03-15",
      value: 760.97,
    },
    {
      date: "2023-03-16",
      value: 986.83,
    },
    {
      date: "2023-03-17",
      value: 994.64,
    },
  ],
};

// Todo: but we also need prev orders trends and prev sales trends
module.exports = {
  getTrendInsights: async () => {
    const response_one = await helper(orders_trends, PROMPT_X_orders);
    const response_two = await helper(sales_trends, PROMPT_X_sales);

    if (!response_one.status && !response_two.status) {
      return {
        status: false,
        error: response_one.error,
      };
    }
    return {
      status: true,
      response_one: response_one.response,
      response_two: response_two.response,
    };
  },
};

async function helper(data, prompt) {
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

    saveText({ x: prompt, y: response, name: "trends" });

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
}

function saveText({ x, y, name }) {
  const default_name = name ?? "data";
  try {
    fs.appendFileSync(
      path.join(path.resolve("./"), "/demo", `${default_name}.txt`),
      `message:${x}\n\n ai:${y}\n\n\n`,
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
