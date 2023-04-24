const router = require("express").Router();
const {
  getFinanceOverallInsights,
  getFinanceOutletWiseInsights,
} = require("../../src/componentAnalysis/financeInsights");

// payable
router.get("/finance-insights-payable", async (req, res) => {
  const response = await getFinanceOutletWiseInsights();
  return res.json({
    message: "finance insights payable",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/finance-insights-payable",
      post_body: {
        outlet_wise_payable: [
          {
            restaurant_name:
              "Leo s Coney Island - Ypsilanti-Bedhead Burritos and Bowls",
            sub_total: 0,
            merchant_commission: 0,
            tips: 0,
            adjustments: 0,
            miscellaneous_payments: 0,
            net_payout: 0,
            tax_remitted_to_state: 0,
          },
          {
            restaurant_name: "Leo s Coney Island - Ypsilanti-House of Parm",
            sub_total: 0,
            merchant_commission: 0,
            tips: 0,
            adjustments: 0,
            miscellaneous_payments: 0,
            net_payout: 0,
            tax_remitted_to_state: 0,
          },
        ],
      },
    },
  });
});
router.post("/finance-insights-payable", async (req, res) => {
  try {
    const outlet_wise_payable = req?.body?.outlet_wise_payable;
    const response = await getFinanceOutletWiseInsights({
      outlet_wise_payable,
    });
    return res.json({
      message: "finance insights payable",
      data: response,
    });
  } catch (err) {
    return res.json({
      message: "finance insights payable error",
      data: err,
    });
  }
});

// overall finance
router.get("/finance-insights-overall", async (req, res) => {
  const response = await getFinanceOverallInsights();
  return res.json({
    message: "finance overall insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/finance-insights-overall",
      post_body: {
        overall_finance: {
          current_period: [
            { start_date: "2023-03-18", end_date: "2023-04-17" },
          ],
          prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
          platform_commission: -1719.91,
          total_deductions: -3766.35,
          net_payout: {
            curr_net_payout: 5299.82,
            prev_net_payout: 5674.28,
            percentage_difference: -6.6,
          },
          tax_remitted_to_state: 467.3,
          order_value: 10420.84,
        },
      },
    },
  });
});
router.post("/finance-insights-overall", async (req, res) => {
  try {
    const overall_finance = req?.body?.overall_finance;
    const response = await getFinanceOverallInsights({
      overall_finance,
    });
    return res.json({
      message: "finance overall insights",
      data: response,
    });
  } catch (error) {
    return res.json({
      message: "finance overall insights error",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
