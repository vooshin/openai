const router = require("express").Router();
const { getOperationInsights } = require("../../src/componentAnalysis/operationsInsight");

router.get("/operations-insights", async (req, res) => {
  const response = await getOperationInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});

module.exports = router;
