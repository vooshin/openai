const router = require("express").Router();
const {
    getCancelationInsights,
} = require("../../src/componentAnalysis/cancellationInsight");

router.get("/cancellation-insights", async (req, res) => {
  const response = await getCancelationInsights();
  return res.json({
    message: "cancelation insights",
    data: response,
  });
});

module.exports = router;
