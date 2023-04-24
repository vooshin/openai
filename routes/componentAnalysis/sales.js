const router = require("express").Router();

// Dashboard Sales Insights
const {
  getTrendInsights,
  getDeductionsInsights,
  getSalesInsights,
} = require("../../src/componentAnalysis/salesInsights");

//  Sales Analysis Insights
const {
  getSalesAnalysisInsightsOne,
  getSalesAnalysisInsightsTwo,
  getSalesAnalysisInsightsThree,
} = require("../../src/componentAnalysis/salesAnalysisInsights");

// Orders / Sales Insights
router.get("/trends-insights", async (req, res) => {
  const response = await getTrendInsights();
  return res.json({
    message: "trends insights",
    data: response,
    post_route: {
      // post_request: "POST /component-analysis/finance-insights",
      post_request: "POST /component-analysis/sales/trends-insights",
      post_body: {
        orders: {
          orders_trends: [
            {
              date: "2023-03-18",
              value: 61,
            },
          ],
          prev_orders_trends: [
            {
              date: "2023-02-15",
              value: 61,
            },
          ],
        },
      },
    },
  });
});
router.post("/trends-insights", async (req, res) => {
  try {
    const orders = req?.body?.orders;
    const sales = req?.body?.sales;
    const response = await getTrendInsights({
      orders,
      sales,
    });
    return res.json({
      message: "trends insights",
      data: response,
      error: null,
    });
  } catch (error) {
    return res.json({
      message: "trends insights error",
      data: null,
      error: error,
    });
  }
});

// Deductions Insights
router.get("/deduction-insights", async (req, res) => {
  const response = await getDeductionsInsights();
  return res.json({
    message: "deduction insights",
    data: response,
    post_route: {
      // post_request: "POST /component-analysis/finance-insights",
      post_request: "POST /component-analysis/sales/deduction-insights",
      post_body: {
        deduction: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
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
        },
      },
    },
  });
});

router.post("/deduction-insights", async (req, res) => {
  try {
    const sales = req?.body?.sales;
    const response = await getDeductionsInsights({
      sales,
    });
    return res.json({
      message: "deduction insights",
      data: response,
      error: null,
    });
  } catch (error) {
    return res.json({
      message: "deduction insights error",
      data: null,
      error: error,
    });
  }
});

// Sales Insights
router.get("/sales-insights", async (req, res) => {
  const response = await getSalesInsights();
  return res.json({
    message: "sales insights",
    data: response,
    post_route: {
      // post_request: "POST /component-analysis/finance-insights",
      post_request: "POST /component-analysis/sales/sales-insights",
      post_body: {
        sales: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
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
        },
      },
    },
  });
});
router.post("/sales-insights", async (req, res) => {
  try {
    const sales = req?.body?.sales;
    const response = await getSalesInsights(req?.body);
    return res.json({
      message: "sales insights",
      data: response,
    });
  } catch (error) {
    return res.json({
      message: "sales insights error",
      data: null,
      error: error,
    });
  }
});

// Sales Analysis Insights 1
router.get("/sales-analysis-insights-1", async (req, res) => {
  const response = await getSalesAnalysisInsightsOne();
  return res.json({
    message: "insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/sales/sales-analysis-insights-1",
      post_body: {
        sales: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
          prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
          localities: {
            "Carpenter Rd": {
              curr_order_count: 55,
              curr_amount: 969.91,
              prev_order_count: 50,
              prev_amount: 964.07,
            },
            "Clinton Twp": {
              curr_order_count: 25,
              curr_amount: 393.45,
              prev_order_count: 38,
              prev_amount: 595.59,
            },
            "Dixie Hwy": {
              curr_order_count: 0,
              curr_amount: 0,
              prev_order_count: 24,
              prev_amount: 391.59,
            },
            "Eureka Rd": {
              curr_order_count: 1,
              curr_amount: 6.91,
              prev_order_count: 69,
              prev_amount: 919.82,
            },
            "Harper Ave": {
              curr_order_count: 10,
              curr_amount: 150.91,
              prev_order_count: 55,
              prev_amount: 908.87,
            },
            "High St": {
              curr_order_count: 27,
              curr_amount: 478.23,
              prev_order_count: 48,
              prev_amount: 1021.58,
            },
            "Orchard Lake": {
              curr_order_count: 31,
              curr_amount: 529.93,
              prev_order_count: 45,
              prev_amount: 729.11,
            },
            "Royal Oak": {
              curr_order_count: 12,
              curr_amount: 231.56,
              prev_order_count: 31,
              prev_amount: 461.47,
            },
            "Shelby Township": {
              curr_order_count: 51,
              curr_amount: 937.77,
              prev_order_count: 50,
              prev_amount: 773.51,
            },
            "Van Dyke": {
              curr_order_count: 30,
              curr_amount: 558.47,
              prev_order_count: 48,
              prev_amount: 779.4,
            },
            "Walled Lake": {
              curr_order_count: 0,
              curr_amount: 0,
              prev_order_count: 8,
              prev_amount: 151,
            },
            "Wayne Michigan Ave": {
              curr_order_count: 65,
              curr_amount: 1053.01,
              prev_order_count: 29,
              prev_amount: 454.17,
            },
            "Zeeb Rd": {
              curr_order_count: 19,
              curr_amount: 292.72,
              prev_order_count: 66,
              prev_amount: 1167.89,
            },
            "N. Linden Rd.": {
              curr_order_count: 57,
              curr_amount: 815.78,
              prev_order_count: 77,
              prev_amount: 1150.91,
            },
            "W Nine Mile": {
              curr_order_count: 264,
              curr_amount: 3834.21,
              prev_order_count: 333,
              prev_amount: 5119.21,
            },
            "Miller Rd": {
              curr_order_count: 103,
              curr_amount: 1527.28,
              prev_order_count: 124,
              prev_amount: 1904.97,
            },
            "Dix Highway": {
              curr_order_count: 108,
              curr_amount: 1919.18,
              prev_order_count: 167,
              prev_amount: 3666.13,
            },
            "Avon Industrial": {
              curr_order_count: 44,
              curr_amount: 756.88,
              prev_order_count: 53,
              prev_amount: 980.91,
            },
            "15 Mile Rd": {
              curr_order_count: 85,
              curr_amount: 1354.55,
              prev_order_count: 125,
              prev_amount: 2720.21,
            },
            Ypsilanti: {
              curr_order_count: 0,
              curr_amount: 0,
              prev_order_count: 12,
              prev_amount: 196.08,
            },
            "Michigan Ave": {
              curr_order_count: 168,
              curr_amount: 2294.26,
              prev_order_count: 288,
              prev_amount: 4227.14,
            },
            "Ottawa River Rd": {
              curr_order_count: 171,
              curr_amount: 3188.7,
              prev_order_count: 55,
              prev_amount: 1216.34,
            },
            "Dixie Hwy - Ohio ": {
              curr_order_count: 108,
              curr_amount: 2599.15,
              prev_order_count: 0,
              prev_amount: 0,
            },
          },
        },
      },
    },
  });
});

router.post("/sales-analysis-insights-1", async (req, res) => {
  try {
    const sales = req?.body?.sales;
    const response = await getSalesAnalysisInsightsOne({
      sales,
    });
    return res.json({
      message: "sales analysis insights 1, location/locality wise",
      data: response,
      error: null,
    });
  } catch (error) {
    return res.json({
      message: "sales analysis insights 1, location/locality wise error",
      data: null,
      error: error,
    });
  }
});

// insights 2
router.get("/sales-analysis-insights-2", async (req, res) => {
  const response = await getSalesAnalysisInsightsTwo();
  return res.json({
    message: "insights",
    data: response,
    post_route: {
      // post_request: "POST /component-analysis/finance-insights",
      post_request: "POST /component-analysis/sales/sales-analysis-insights-2",
      post_body: {
        sales: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
          prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
          total_order_details: {
            total_count: 1433,
            last_period_value: 1793,
            percentage_difference: -20.08,
          },
          total_amount_details: {
            total_amount: 23862.1,
            last_period_value: 30496.16,
            percentage_difference: -21.75,
          },
          total_orders_cancelled_details: {
            total_orders_cancelled: 60,
            last_period_value: 129,
            percentage_difference: 53.49,
          },
          total_items_sold_details: {
            total_items_sold: 4382,
            last_period_value: 5351,
            percentage_difference: -18.11,
          },
          order_cancelled_details: [
            {
              name: "DOORDASH",
              children: [
                {
                  name: "CANCEL",
                  size: 37,
                },
              ],
            },
            {
              name: "UBEREATS",
              children: [
                {
                  name: "EATER CANCELED",
                  size: 3,
                },
                {
                  name: "UNABLE TO DELIVER",
                  size: 6,
                },
                {
                  name: "OPS CANCELED",
                  size: 6,
                },
                {
                  name: "UNACCEPTED",
                  size: 2,
                },
              ],
            },
            {
              name: "GRUBHUB",
              children: [
                {
                  name: "CANCEL",
                  size: 7,
                },
              ],
            },
          ],
          revenue_breakup_details: [
            {
              name: "DOORDASH",
              total_amount: 16550.61,
              total_orders: 1030,
              total_items_sold: 3537,
              total_orders_cancelled: 37,
            },
            {
              name: "UBEREATS",
              total_amount: 6129.74,
              total_orders: 344,
              total_items_sold: 657,
              total_orders_cancelled: 17,
            },
            {
              name: "GRUBHUB",
              total_amount: 1181.75,
              total_orders: 59,
              total_items_sold: 188,
              total_orders_cancelled: 6,
            },
          ],
          prev_revenue_breakup_details: [
            {
              name: "DOORDASH",
              total_amount: 20607.14,
              total_orders: 1256,
              total_items_sold: 4276,
              total_orders_cancelled: 70,
            },
            {
              name: "UBEREATS",
              total_amount: 8030.9,
              total_orders: 450,
              total_items_sold: 784,
              total_orders_cancelled: 42,
            },
            {
              name: "GRUBHUB",
              total_amount: 1858.12,
              total_orders: 87,
              total_items_sold: 291,
              total_orders_cancelled: 17,
            },
          ],
        },
      },
    },
  });
});
router.post("/sales-analysis-insights-2", async (req, res) => {
  try {
    const sales = req?.body?.sales;
    const response = await getSalesAnalysisInsightsTwo({
      sales,
    });
    return res.json({
      message: "sales analysis insights 2, overall sales(order, amount, items, revenue)",
      data: response,
      error: null,
    });
  } catch (error) {
    return res.json({
      message: "sales analysis insights 2, overall sales(order, amount, items, revenue) error",
      data: null,
      error: error,
    });
  }
});

// insights 3
router.get("/sales-analysis-insights-3", async (req, res) => {
  const response = await getSalesAnalysisInsightsThree();
  return res.json({
    message: "insights",
    data: response,
    post_route: {
      // post_request: "POST /component-analysis/finance-insights",
      post_request: "POST /component-analysis/sales/sales-analysis-insights-3",
      post_body: {
        sales: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
          prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
          platforms_wise_data: {
            DOORDASH: {
              count: 1030,
              order_completed: 1030,
              order_delivered: 1030,
              order_cancelled: 37,
              item_quantity: 3537,
              amount: 16550.61,
              orders_trends: [
                {
                  date: "2023-03-18",
                  value: 44,
                },
                {
                  date: "2023-03-19",
                  value: 50,
                },
                {
                  date: "2023-03-20",
                  value: 26,
                },
                {
                  date: "2023-03-21",
                  value: 29,
                },
                {
                  date: "2023-03-22",
                  value: 38,
                },
                {
                  date: "2023-03-23",
                  value: 22,
                },
                {
                  date: "2023-03-24",
                  value: 36,
                },
                {
                  date: "2023-03-25",
                  value: 39,
                },
                {
                  date: "2023-03-26",
                  value: 48,
                },
                {
                  date: "2023-03-27",
                  value: 25,
                },
                {
                  date: "2023-03-28",
                  value: 33,
                },
                {
                  date: "2023-03-29",
                  value: 28,
                },
                {
                  date: "2023-03-30",
                  value: 36,
                },
                {
                  date: "2023-03-31",
                  value: 46,
                },
                {
                  date: "2023-04-01",
                  value: 29,
                },
                {
                  date: "2023-04-02",
                  value: 40,
                },
                {
                  date: "2023-04-03",
                  value: 28,
                },
                {
                  date: "2023-04-04",
                  value: 19,
                },
                {
                  date: "2023-04-05",
                  value: 31,
                },
                {
                  date: "2023-04-06",
                  value: 32,
                },
                {
                  date: "2023-04-07",
                  value: 29,
                },
                {
                  date: "2023-04-08",
                  value: 49,
                },
                {
                  date: "2023-04-09",
                  value: 30,
                },
                {
                  date: "2023-04-10",
                  value: 27,
                },
                {
                  date: "2023-04-11",
                  value: 25,
                },
                {
                  date: "2023-04-12",
                  value: 32,
                },
                {
                  date: "2023-04-13",
                  value: 28,
                },
                {
                  date: "2023-04-14",
                  value: 30,
                },
                {
                  date: "2023-04-15",
                  value: 32,
                },
                {
                  date: "2023-04-16",
                  value: 40,
                },
                {
                  date: "2023-04-17",
                  value: 29,
                },
              ],
              prev_count: 1256,
              prev_order_completed: 1256,
              prev_order_delivered: 1256,
              prev_order_cancelled: 70,
              prev_item_quantity: 4276,
              prev_amount: 20607.14,
              prev_orders_trends: [
                {
                  date: "2023-02-15",
                  value: 33,
                },
                {
                  date: "2023-02-16",
                  value: 39,
                },
                {
                  date: "2023-02-17",
                  value: 46,
                },
                {
                  date: "2023-02-18",
                  value: 37,
                },
                {
                  date: "2023-02-19",
                  value: 42,
                },
                {
                  date: "2023-02-20",
                  value: 27,
                },
                {
                  date: "2023-02-21",
                  value: 44,
                },
                {
                  date: "2023-02-22",
                  value: 23,
                },
                {
                  date: "2023-02-23",
                  value: 46,
                },
                {
                  date: "2023-02-24",
                  value: 51,
                },
                {
                  date: "2023-02-25",
                  value: 75,
                },
                {
                  date: "2023-02-26",
                  value: 61,
                },
                {
                  date: "2023-02-27",
                  value: 36,
                },
                {
                  date: "2023-02-28",
                  value: 37,
                },
                {
                  date: "2023-03-01",
                  value: 45,
                },
                {
                  date: "2023-03-02",
                  value: 44,
                },
                {
                  date: "2023-03-03",
                  value: 49,
                },
                {
                  date: "2023-03-04",
                  value: 36,
                },
                {
                  date: "2023-03-05",
                  value: 41,
                },
                {
                  date: "2023-03-06",
                  value: 39,
                },
                {
                  date: "2023-03-07",
                  value: 26,
                },
                {
                  date: "2023-03-08",
                  value: 44,
                },
                {
                  date: "2023-03-09",
                  value: 29,
                },
                {
                  date: "2023-03-10",
                  value: 45,
                },
                {
                  date: "2023-03-11",
                  value: 49,
                },
                {
                  date: "2023-03-12",
                  value: 47,
                },
                {
                  date: "2023-03-13",
                  value: 34,
                },
                {
                  date: "2023-03-14",
                  value: 23,
                },
                {
                  date: "2023-03-15",
                  value: 27,
                },
                {
                  date: "2023-03-16",
                  value: 38,
                },
                {
                  date: "2023-03-17",
                  value: 43,
                },
              ],
            },
            UBEREATS: {
              count: 344,
              order_completed: 344,
              order_delivered: 344,
              order_cancelled: 17,
              item_quantity: 657,
              amount: 6129.74,
              orders_trends: [
                {
                  date: "2023-03-18",
                  value: 13,
                },
                {
                  date: "2023-03-19",
                  value: 25,
                },
                {
                  date: "2023-03-20",
                  value: 11,
                },
                {
                  date: "2023-03-21",
                  value: 7,
                },
                {
                  date: "2023-03-22",
                  value: 7,
                },
                {
                  date: "2023-03-23",
                  value: 17,
                },
                {
                  date: "2023-03-24",
                  value: 13,
                },
                {
                  date: "2023-03-25",
                  value: 16,
                },
                {
                  date: "2023-03-26",
                  value: 8,
                },
                {
                  date: "2023-03-27",
                  value: 14,
                },
                {
                  date: "2023-03-28",
                  value: 4,
                },
                {
                  date: "2023-03-29",
                  value: 9,
                },
                {
                  date: "2023-03-30",
                  value: 10,
                },
                {
                  date: "2023-03-31",
                  value: 10,
                },
                {
                  date: "2023-04-01",
                  value: 8,
                },
                {
                  date: "2023-04-02",
                  value: 14,
                },
                {
                  date: "2023-04-03",
                  value: 9,
                },
                {
                  date: "2023-04-04",
                  value: 12,
                },
                {
                  date: "2023-04-05",
                  value: 11,
                },
                {
                  date: "2023-04-06",
                  value: 5,
                },
                {
                  date: "2023-04-07",
                  value: 14,
                },
                {
                  date: "2023-04-08",
                  value: 12,
                },
                {
                  date: "2023-04-09",
                  value: 6,
                },
                {
                  date: "2023-04-10",
                  value: 11,
                },
                {
                  date: "2023-04-11",
                  value: 12,
                },
                {
                  date: "2023-04-12",
                  value: 7,
                },
                {
                  date: "2023-04-13",
                  value: 9,
                },
                {
                  date: "2023-04-14",
                  value: 6,
                },
                {
                  date: "2023-04-15",
                  value: 15,
                },
                {
                  date: "2023-04-16",
                  value: 19,
                },
                {
                  date: "2023-04-17",
                  value: 10,
                },
              ],
              prev_count: 450,
              prev_order_completed: 450,
              prev_order_delivered: 450,
              prev_order_cancelled: 42,
              prev_item_quantity: 784,
              prev_amount: 8030.9,
              prev_orders_trends: [
                {
                  date: "2023-02-15",
                  value: 9,
                },
                {
                  date: "2023-02-16",
                  value: 14,
                },
                {
                  date: "2023-02-17",
                  value: 21,
                },
                {
                  date: "2023-02-18",
                  value: 16,
                },
                {
                  date: "2023-02-19",
                  value: 17,
                },
                {
                  date: "2023-02-20",
                  value: 7,
                },
                {
                  date: "2023-02-21",
                  value: 6,
                },
                {
                  date: "2023-02-22",
                  value: 11,
                },
                {
                  date: "2023-02-23",
                  value: 16,
                },
                {
                  date: "2023-02-24",
                  value: 14,
                },
                {
                  date: "2023-02-25",
                  value: 16,
                },
                {
                  date: "2023-02-26",
                  value: 21,
                },
                {
                  date: "2023-02-27",
                  value: 24,
                },
                {
                  date: "2023-02-28",
                  value: 14,
                },
                {
                  date: "2023-03-01",
                  value: 19,
                },
                {
                  date: "2023-03-02",
                  value: 17,
                },
                {
                  date: "2023-03-03",
                  value: 14,
                },
                {
                  date: "2023-03-04",
                  value: 21,
                },
                {
                  date: "2023-03-05",
                  value: 16,
                },
                {
                  date: "2023-03-06",
                  value: 17,
                },
                {
                  date: "2023-03-07",
                  value: 12,
                },
                {
                  date: "2023-03-08",
                  value: 6,
                },
                {
                  date: "2023-03-09",
                  value: 15,
                },
                {
                  date: "2023-03-10",
                  value: 25,
                },
                {
                  date: "2023-03-11",
                  value: 10,
                },
                {
                  date: "2023-03-12",
                  value: 20,
                },
                {
                  date: "2023-03-13",
                  value: 8,
                },
                {
                  date: "2023-03-14",
                  value: 8,
                },
                {
                  date: "2023-03-15",
                  value: 14,
                },
                {
                  date: "2023-03-16",
                  value: 12,
                },
                {
                  date: "2023-03-17",
                  value: 10,
                },
              ],
            },
            GRUBHUB: {
              count: 59,
              order_completed: 59,
              order_delivered: 59,
              order_cancelled: 6,
              item_quantity: 188,
              amount: 1181.75,
              orders_trends: [
                {
                  date: "2023-03-18",
                  value: 4,
                },
                {
                  date: "2023-03-19",
                  value: 3,
                },
                {
                  date: "2023-03-20",
                  value: 1,
                },
                {
                  date: "2023-03-21",
                  value: 1,
                },
                {
                  date: "2023-03-22",
                  value: 3,
                },
                {
                  date: "2023-03-23",
                  value: 5,
                },
                {
                  date: "2023-03-25",
                  value: 1,
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
                  date: "2023-03-30",
                  value: 1,
                },
                {
                  date: "2023-04-01",
                  value: 1,
                },
                {
                  date: "2023-04-02",
                  value: 4,
                },
                {
                  date: "2023-04-04",
                  value: 1,
                },
                {
                  date: "2023-04-06",
                  value: 5,
                },
                {
                  date: "2023-04-07",
                  value: 2,
                },
                {
                  date: "2023-04-08",
                  value: 3,
                },
                {
                  date: "2023-04-10",
                  value: 2,
                },
                {
                  date: "2023-04-11",
                  value: 2,
                },
                {
                  date: "2023-04-12",
                  value: 2,
                },
                {
                  date: "2023-04-13",
                  value: 3,
                },
                {
                  date: "2023-04-14",
                  value: 5,
                },
                {
                  date: "2023-04-15",
                  value: 1,
                },
                {
                  date: "2023-04-16",
                  value: 1,
                },
                {
                  date: "2023-04-17",
                  value: 3,
                },
              ],
              prev_count: 87,
              prev_order_completed: 87,
              prev_order_delivered: 87,
              prev_order_cancelled: 17,
              prev_item_quantity: 291,
              prev_amount: 1858.12,
              prev_orders_trends: [
                {
                  date: "2023-02-15",
                  value: 3,
                },
                {
                  date: "2023-02-16",
                  value: 2,
                },
                {
                  date: "2023-02-17",
                  value: 2,
                },
                {
                  date: "2023-02-18",
                  value: 5,
                },
                {
                  date: "2023-02-19",
                  value: 1,
                },
                {
                  date: "2023-02-20",
                  value: 5,
                },
                {
                  date: "2023-02-21",
                  value: 2,
                },
                {
                  date: "2023-02-22",
                  value: 5,
                },
                {
                  date: "2023-02-23",
                  value: 3,
                },
                {
                  date: "2023-02-24",
                  value: 3,
                },
                {
                  date: "2023-02-25",
                  value: 3,
                },
                {
                  date: "2023-02-26",
                  value: 2,
                },
                {
                  date: "2023-02-27",
                  value: 5,
                },
                {
                  date: "2023-02-28",
                  value: 6,
                },
                {
                  date: "2023-03-01",
                  value: 2,
                },
                {
                  date: "2023-03-03",
                  value: 3,
                },
                {
                  date: "2023-03-04",
                  value: 5,
                },
                {
                  date: "2023-03-05",
                  value: 4,
                },
                {
                  date: "2023-03-06",
                  value: 3,
                },
                {
                  date: "2023-03-07",
                  value: 1,
                },
                {
                  date: "2023-03-08",
                  value: 1,
                },
                {
                  date: "2023-03-09",
                  value: 2,
                },
                {
                  date: "2023-03-11",
                  value: 2,
                },
                {
                  date: "2023-03-12",
                  value: 4,
                },
                {
                  date: "2023-03-13",
                  value: 2,
                },
                {
                  date: "2023-03-14",
                  value: 1,
                },
                {
                  date: "2023-03-15",
                  value: 3,
                },
                {
                  date: "2023-03-16",
                  value: 6,
                },
                {
                  date: "2023-03-17",
                  value: 1,
                },
              ],
            },
          },
        },
      },
    },
  });
});
router.post("/sales-analysis-insights-3", async (req, res) => {
 try {
  const sales = req?.body?.sales;
  const response = await getSalesAnalysisInsightsThree({
    sales,
  });
  return res.json({
    message: "sales analysis insights 3, platform wise sales",
    data: response,
    error: null,
  });
  
 } catch (error) {
  return res.json({
    message: "sales analysis insights 3, platform wise sales",
    data: null,
    error: error.message,
  });

 }
});

module.exports = router;
