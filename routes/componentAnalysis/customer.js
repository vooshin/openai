const router = require("express").Router();
const {
  getCustomerInsights,
} = require("../../src/componentAnalysis/customerInsight");

router.get("/customer-insights", async (req, res) => {
  const response = await getCustomerInsights();
  return res.json({
    message: "customer insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/customer-insights",
      post_body: {
        overall_customers: {
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
        },
      },
    },
  });
});
router.post("/customer-insights", async (req, res) => {
  try {
    const overall_customers = req?.body?.overall_customers;
    const response = await getCustomerInsights({
      overall_customers,
    });
    return res.json({
      message: "customer insights",
      data: response,
      error: null,
    });
  } catch (error) {
    return {
      message: "customer insights error",
      data: null,
      error: error,
    };
  }
});

module.exports = router;
