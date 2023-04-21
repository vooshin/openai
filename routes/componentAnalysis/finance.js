const router = require("express").Router();
const { getFinanceInsights } = require("../../src/componentAnalysis/index");

router.get("/finance-insights", async (req, res) => {
  const response = await getFinanceInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});

module.exports = router;
