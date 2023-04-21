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

router.get("/trends-insights", async (req, res) => {
  const response = await getTrendInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});
router.get("/deduction-insights", async (req, res) => {
  const response = await getDeductionsInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});
router.get("/sales-insights", async (req, res) => {
  const response = await getSalesInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});
router.get("/sales-analysis-insights-1", async (req, res) => {
  const response = await getSalesAnalysisInsightsOne();
  return res.json({
    message: "insights",
    data: response,
  });
});
router.get("/sales-analysis-insights-2", async (req, res) => {
  const response = await getSalesAnalysisInsightsTwo();
  return res.json({
    message: "insights",
    data: response,
  });
});
router.get("/sales-analysis-insights-3", async (req, res) => {
  const response = await getSalesAnalysisInsightsThree();
  return res.json({
    message: "insights",
    data: response,
  });
});

module.exports = router;
