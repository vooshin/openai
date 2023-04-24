const router = require("express").Router();
const {
  getCancelationInsights,
} = require("../../src/componentAnalysis/cancellationInsight");

router.get("/cancellation-insights", async (req, res) => {
  const response = await getCancelationInsights();
  return res.json({
    message: "cancelation insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/cancellation-insights",
      post_body: {
        cancelation_data: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
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
        },
      },
    },
  });
});
router.post("/cancellation-insights", async (req, res) => {
  try {
    const cancelled_data = req?.body?.cancelled_data;

    const response = await getCancelationInsights({
      cancelled_data,
    });
    return res.json({
      message: "cancelation insights",
      data: response,
      error: null,
    });
  } catch (error) {
    return res.json({
      message: "cancelation insights error",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
