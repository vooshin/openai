const router = require("express").Router();
const {
  getOperationStoreWiseInsights,
  getOperationPlatformWiseInsights,
} = require("../../src/componentAnalysis/operationsInsight");

//  store wise insights
router.get("/operations-insights-1", async (req, res) => {
  const response = await getOperationStoreWiseInsights();
  return res.json({
    message: "insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/operations-insights-1",
      post_body: {
        stores_serviceability: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],

          serviceability_by_storeid: [
            {
              listing_id: "P0081",
              name: "Leos Coney Island-West Bloomfield-Cheesesteak Daddy",
              total_rate: 3600,
              total_count: 37,
              avg_rate: 97.3,
            },
            {
              listing_id: "P0082",
              name: "Leos Coney Island-West Bloomfield-Pop s Meatball Sandwich",
              total_rate: 3300,
              total_count: 33,
              avg_rate: 100,
            },
            {
              listing_id: "P0083",
              name: "Leos Coney Island-West Bloomfield-Cheeky Bird",
              total_rate: 3400,
              total_count: 35,
              avg_rate: 97.14,
            },
            {
              listing_id: "P0091",
              name: "Fifth Avenue-Cheesesteak Daddy",
              total_rate: 2195,
              total_count: 35,
              avg_rate: 62.71,
            },

            {
              listing_id: "P0303",
              name: "Moe s Place-Cheeky Bird",
              total_rate: 2708,
              total_count: 31,
              avg_rate: 87.35,
            },
          ],
        },
      },
    },
  });
});

router.post("/operations-insights-1", async (req, res) => {
  try {
    const stores_serviceability = req?.body?.stores_serviceability;

    const response = await getOperationStoreWiseInsights({
      stores_serviceability,
    });
    return res.json({
      message: "operations insights-1, serviceability by store-id",
      data: response,
      error: null,
    });
  } catch (error) {
    return {
      message: "operations insights-1, serviceability by store-id error",
      data: null,
      error: error,
    };
  }
});

// platform wise insights
router.get("/operations-insights-2", async (req, res) => {
  const response = await getOperationStoreWiseInsights();
  return res.json({
    message: "insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/operations-insights-2",
      post_body: {
        serviceability_platform_wise: {
          platform_wise_online_rate: {
            DOORDASH: {
              channel: "DOORDASH",
              total_online_rate: 41437.22,
              total_online_count: 438,
              avg_online_rate: 94.61,
              prev_total_online_rate: 62212.23,
              prev_total_online_count: 669,
              prev_avg_online_rate: 92.99,
              percentage_difference: 1.73,
            },
            UBEREATS: {
              channel: "UBEREATS",
              total_online_rate: 211667,
              total_online_count: 2249,
              avg_online_rate: 94.12,
              prev_total_online_rate: 212572,
              prev_total_online_count: 2201,
              prev_avg_online_rate: 96.58,
              percentage_difference: -2.55,
            },
            GRUBHUB: {
              channel: "GRUBHUB",
              total_online_rate: 0,
              total_online_count: 0,
              avg_online_rate: 0,
              prev_total_online_rate: 0,
              prev_total_online_count: 0,
              prev_avg_online_rate: 0,
              percentage_difference: 0,
            },
          },
          platform_wise_online_rate_prev: {
            DOORDASH: {
              channel: "DOORDASH",
              total_online_rate: 62212.23,
              total_online_count: 669,
              avg_online_rate: 92.99,
            },
            UBEREATS: {
              channel: "UBEREATS",
              total_online_rate: 212572,
              total_online_count: 2201,
              avg_online_rate: 96.58,
            },
            GRUBHUB: {
              channel: "GRUBHUB",
              total_online_rate: 0,
              total_online_count: 0,
              avg_online_rate: 0,
            },
          },
        },
      },
    },
  });
});
router.post("/operations-insights-2", async (req, res) => {
  try {
    const serviceability_platform_wise =
      req?.body?.serviceability_platform_wise;

    const response = await getOperationPlatformWiseInsights({
      serviceability_platform_wise,
    });
    return res.json({
      message: "operations insights-2, serviceability by platform",
      data: response,
      error: null,
    });
  } catch (error) {
    return {
      message: "operations insights-2, serviceability by platform error",
      data: null,
      error: error,
    };
  }
});

module.exports = router;
