const { getOpenAIResponse } = require("../openai/fetchResponse");

const PROMPT_CUSTOMER_INSIGHT = `Consider yourself as statistical analyst for a restaurant chain. ypu have given a json data of customer insights, mostly it contains the number of customers purchased/ordered from the restaurants(also give some percentage evaluation), generate a report of customer insights. it should be of 30 words or less.`;

const customer_insight_data = {
  Total_Customers: 2654,
  New_Customers: 2257,
  Frequent_Customers: 404,
  Occational_Customers: 578,
  customer_count_graph: [
    {
      name: "Frequent",
      value: 404,
    },
    {
      name: "Occasional",
      value: 578,
    },
    {
      name: "New",
      value: 2257,
    },
  ],
};
module.exports = {
  getCustomerInsights: async (payload) => {
    const { overall_customers } = payload || {};
    const data = await getOpenAIResponse(
      overall_customers ? overall_customers : customer_insight_data,
      PROMPT_CUSTOMER_INSIGHT,
      "customer insight"
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
