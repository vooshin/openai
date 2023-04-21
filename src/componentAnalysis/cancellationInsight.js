const { getOpenAIResponse } = require("../openai/fetchResponse");

const PROMPT_CANCELATION = `Consider you are expert in  statistical analysis, you are provide with cancelled data of orders for multiple restaurants. you are asked to provide a statistical analysis for the cancelled data it also contain date wise cancelled orders, the response should be of 30 words or less and provide a statistical explanation for the cancelled data to restaurant owner/ manager, and don't add text like further details/ analysis required.`;

// const PROMPT_CANCELATION = `Consider you are expert in  statistical analysis, you are provide with cancelled data of orders for multiple restaurants. you are asked to provide a statistical analysis for the cancelled data, for cancelled orders, provide a list of reasons why the order is cancelled, and also check how many times same reason is repeated. the response should be of 30 words or less. make it like i am asking you to provide a report on the cancelled data and im restaurant owner.
// `;

const cancelation_data = {
  current_period: [{ start_date: "2023-03-18", end_date: "2023-04-17" }],
  prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
  cancelled_orders: {
    overall: [
      {
        date: "2023-03-19",
        value: 3,
      },
      {
        date: "2023-03-20",
        value: 4,
      },
      {
        date: "2023-03-21",
        value: 3,
      },
      {
        date: "2023-03-22",
        value: 1,
      },
      {
        date: "2023-03-23",
        value: 3,
      },
      {
        date: "2023-03-24",
        value: 2,
      },
      {
        date: "2023-03-25",
        value: 3,
      },
      {
        date: "2023-03-26",
        value: 5,
      },
      {
        date: "2023-03-27",
        value: 1,
      },
      {
        date: "2023-03-28",
        value: 0,
      },
      {
        date: "2023-03-29",
        value: 2,
      },
      {
        date: "2023-03-30",
        value: 1,
      },
      {
        date: "2023-03-31",
        value: 2,
      },
      {
        date: "2023-04-01",
        value: 5,
      },
      {
        date: "2023-04-02",
        value: 5,
      },
      {
        date: "2023-04-03",
        value: 2,
      },
      {
        date: "2023-04-04",
        value: 1,
      },
      {
        date: "2023-04-05",
        value: 0,
      },
      {
        date: "2023-04-06",
        value: 1,
      },
      {
        date: "2023-04-07",
        value: 2,
      },
      {
        date: "2023-04-08",
        value: 2,
      },
      {
        date: "2023-04-09",
        value: 7,
      },
      {
        date: "2023-04-10",
        value: 1,
      },
      {
        date: "2023-04-11",
        value: 0,
      },
      {
        date: "2023-04-12",
        value: 1,
      },
      {
        date: "2023-04-13",
        value: 0,
      },
      {
        date: "2023-04-15",
        value: 1,
      },
      {
        date: "2023-04-16",
        value: 0,
      },
      {
        date: "2023-04-17",
        value: 2,
      },
    ],
    DOORDASH: [
      {
        date: "2023-03-20",
        value: 4,
      },
      {
        date: "2023-03-21",
        value: 2,
      },
      {
        date: "2023-03-22",
        value: 1,
      },
      {
        date: "2023-03-23",
        value: 0,
      },
      {
        date: "2023-03-24",
        value: 1,
      },
      {
        date: "2023-03-25",
        value: 2,
      },
      {
        date: "2023-03-26",
        value: 4,
      },
      {
        date: "2023-03-27",
        value: 1,
      },
      {
        date: "2023-03-28",
        value: 0,
      },
      {
        date: "2023-03-29",
        value: 2,
      },
      {
        date: "2023-03-30",
        value: 1,
      },
      {
        date: "2023-03-31",
        value: 1,
      },
      {
        date: "2023-04-01",
        value: 5,
      },
      {
        date: "2023-04-02",
        value: 2,
      },
      {
        date: "2023-04-03",
        value: 0,
      },
      {
        date: "2023-04-07",
        value: 1,
      },
      {
        date: "2023-04-08",
        value: 1,
      },
      {
        date: "2023-04-09",
        value: 5,
      },
      {
        date: "2023-04-10",
        value: 0,
      },
      {
        date: "2023-04-12",
        value: 1,
      },
      {
        date: "2023-04-13",
        value: 0,
      },
      {
        date: "2023-04-15",
        value: 1,
      },
      {
        date: "2023-04-16",
        value: 0,
      },
      {
        date: "2023-04-17",
        value: 2,
      },
    ],
    UBEREATS: [
      {
        date: "2023-03-19",
        value: 2,
      },
      {
        date: "2023-03-20",
        value: 0,
      },
      {
        date: "2023-03-23",
        value: 1,
      },
      {
        date: "2023-03-24",
        value: 0,
      },
      {
        date: "2023-03-25",
        value: 1,
      },
      {
        date: "2023-03-26",
        value: 1,
      },
      {
        date: "2023-03-27",
        value: 0,
      },
      {
        date: "2023-03-31",
        value: 1,
      },
      {
        date: "2023-04-01",
        value: 0,
      },
      {
        date: "2023-04-02",
        value: 3,
      },
      {
        date: "2023-04-03",
        value: 1,
      },
      {
        date: "2023-04-04",
        value: 1,
      },
      {
        date: "2023-04-05",
        value: 0,
      },
      {
        date: "2023-04-06",
        value: 1,
      },
      {
        date: "2023-04-07",
        value: 1,
      },
      {
        date: "2023-04-08",
        value: 1,
      },
      {
        date: "2023-04-09",
        value: 2,
      },
      {
        date: "2023-04-10",
        value: 1,
      },
    ],
    GRUBHUB: [
      {
        date: "2023-03-19",
        value: 1,
      },
      {
        date: "2023-03-20",
        value: 0,
      },
      {
        date: "2023-03-21",
        value: 1,
      },
      {
        date: "2023-03-22",
        value: 0,
      },
      {
        date: "2023-03-23",
        value: 2,
      },
      {
        date: "2023-03-24",
        value: 1,
      },
      {
        date: "2023-03-25",
        value: 0,
      },
      {
        date: "2023-04-03",
        value: 1,
      },
    ],
  },
  missed_and_wrong_orders_breakdown: [
    {
      name: "CANCELLED",
      value: 44,
    },
    {
      name: "ERROR/INCORRECT",
      value: 10,
    },
  ],
};
module.exports = {
  getCancelationInsights: async () => {
    const data = await getOpenAIResponse(
      cancelation_data,
      PROMPT_CANCELATION,
      "cancelation"
    );

    if (!data.status) {
      return {
        status: false,
        error: data.error,
      };
    }
    return {
      status: true,
      data: data.response,
    };
  },
};
