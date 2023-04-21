const router = require("express").Router();
const {
  getFeedbackInsights,
} = require("../../src/componentAnalysis/feedbackInsights");

router.get("/feedback-insights", async (req, res) => {
  const response = await getFeedbackInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});

module.exports = router;
