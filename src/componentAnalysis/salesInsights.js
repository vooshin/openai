const { getOpenAIResponse } = require("../openai/fetchResponse");

// ----------------- prompt and sample data -----------------

const PROMPT_ORDER_TRENDS = `give me statistic insights of the orders data(consider orders_trends object as present selected date range data, call it as current period orders and other one as past period orders), like The response should be in 30 words or less, consider this array of objects contains the orders data day wise, make the response like im explaining the data to a restaurant owner/manager/business owner. don't call it orders_trends, call it current period orders and past period orders. if possible mention the percentage of increase/decrease in orders and date`;
const PROMPT_SALES_TREND = `give me statistic insights of the sales data(consider orders_trends object as present selected date range data, call it as current period sales and other one as past period sales), like The response should be in 30 words or less, consider this array of objects contains the sales data day wise, make the response like im explaining the data to a restaurant owner/manager/business owner.  don't call it orders_trends, call it current period orders and past period orders. if possible mention the percentage of increase/decrease in orders and date`;
const PROMPT_DEDUCTION = `Consider you are expert in sales analytics and statistics. You are provide with the following data(deduction details of a restaurant, consider deductions_donut object as present selected date range data, call it as current period deduction and other one as past period deduction) and you are asked to provide insights on the data. the response should be of 30 words or less. The data is as follows,`;
const PROMPT_SALES = `Consider you are expert in sales analytics and statistics. You have to provide insights to the restaurant owner about the sales for all the restaurant,  the response should be of 30 words or less. You have the following data available with you. `;
const sales_data = {
  current_period: [{ start_date: "2023-03-18", end_date: "2023-04-17" }],
  prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
  rating_card: {
    avg_rating: 3.85,
    prev_rating: 3.82,
    last_period_value: 3.82,
    percentage_difference: 0.8,
  },
  total_online_rate: {
    avg_rate: 94.27,
    avg_online_rate: 94.27,
    last_period_value: 95.77,
    percentage_difference: -1.57,
  },
  net_payout: {
    curr_net_payout: 5296.42,
    prev_net_payout: 5684.32,
    percentage_difference: -6.82,
  },
  total_orders: {
    curr_total_count: 1433,
    last_period_value: 1795,
    curr_total_amount: 23880.37,
    prev_total_amount: 30499.97,
    percentage_difference: -25.26,
    percentage_amount: -27.72,
  },
  city_wise_data: {
    "Ann Arbor": {
      curr_order_count: 73,
      curr_amount: 1253.89,
      prev_order_count: 116,
      prev_amount: 2131.96,
    },
    Detroit: {
      curr_order_count: 1081,
      curr_amount: 16838.63,
      prev_order_count: 1624,
      prev_amount: 27151.67,
    },
    Toledo: {
      curr_order_count: 171,
      curr_amount: 3188.7,
      prev_order_count: 55,
      prev_amount: 1216.34,
    },
    Rossford: {
      curr_order_count: 108,
      curr_amount: 2599.15,
      prev_order_count: 0,
      prev_amount: 0,
    },
  },
};

const deduction_data = {
  current_period: [{ start_date: "2023-03-18", end_date: "2023-04-17" }],
  deductions_donut: [
    {
      name: "miscellaneous_payments",
      value: -6175.9,
    },
    {
      name: "merchant_commission",
      value: -3475.16,
    },
    {
      name: "promo_spend_on_food",
      value: -1965.45,
    },
    {
      name: "merchant_commission_tax",
      value: -884.38,
    },
    {
      name: "delivery_network_fee",
      value: 365.81,
    },
    {
      name: "tax_on_promotion_on_food",
      value: -97.41,
    },
    {
      name: "marketing_fees",
      value: -82.63,
    },
  ],
  prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
  prev_deductions_donut: [
    {
      name: "merchant_commission",
      value: -3475.16,
    },
    {
      name: "merchant_commission_tax",
      value: -884.38,
    },
    {
      name: "marketing_fees",
      value: -82.63,
    },
    {
      name: "delivery_network_fee",
      value: 365.81,
    },
    {
      name: "promo_spend_on_food",
      value: -1965.45,
    },
    {
      name: "tax_on_promotion_on_food",
      value: -97.41,
    },
    {
      name: "miscellaneous_payments",
      value: -6175.9,
    },
  ],
};
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

// -----------------------------------------------------------

module.exports = {
  // Todo: but we also need prev orders trends and prev sales trends
  // * used in dashboard
  getTrendInsights: async (payload) => {
    const { orders, sales } = payload ?? {};
    const order_trends_response = await getOpenAIResponse(
      orders ? orders : orders_trends,
      PROMPT_ORDER_TRENDS,
      "order_trends"
    );
    const sales_trend_response = await getOpenAIResponse(
      sales ? sales : sales_trends,
      PROMPT_SALES_TREND,
      "sales_trends"
    );

    if (!order_trends_response.status && !sales_trend_response.status) {
      return {
        status: false,
        error: order_trends_response.error,
      };
    }
    return {
      status: true,
      data: {
        order_trends_response: order_trends_response.response,
        sales_trend_response: sales_trend_response.response,
      },
    };
  },
  // * used in dashboard
  getDeductionsInsights: async (payload) => {
    const { deductions } = payload ??{}
    const data = await getOpenAIResponse(
      deductions ? deductions : deduction_data,
      PROMPT_DEDUCTION,
      "deduction"
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
  // * used in dashboard
  getSalesInsights: async (payload) => {
    const { sales } = payload ??{}
    const data = await getOpenAIResponse(
      sales?sales:sales_data,
      PROMPT_SALES,
      "sales_information"
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
