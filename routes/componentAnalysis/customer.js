const router = require("express").Router();
const { getCustomerInsights } = require("../../src/componentAnalysis/customerInsight");

router.get("/customer-insights", async (req, res) => {
  const response = await getCustomerInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});

module.exports = router;
