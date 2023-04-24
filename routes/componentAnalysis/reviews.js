const router = require("express").Router();
const {
  getFeedbackInsights,
} = require("../../src/componentAnalysis/feedbackInsights");

router.get("/feedback-insights", async (req, res) => {
  const response = await getFeedbackInsights();
  return res.json({
    message: "feedback insights",
    data: response,
    post_route: {
      post_request: "POST /component-analysis/feedback-insights",
      post_body: {
        feedback: [
          {
            name: "Orange Tree Cafe Restaurant-Bedhead Burritos and Bowls",
            feedback:
              "first time trying this place and my burrito is missing half the ingredients lol..",
            order_id: "a0f74fc8",
            rating: 1,
            outlet: "P0251",
            channel: "DOORDASH",
          },
        ],
      },
    },
  });
});
router.post("/feedback-insights", async (req, res) => {
  try {
    const { feedback } = req?.body;
    const response = await getFeedbackInsights({
      feedback,
    });
    return res.json({
      message: "feedback insights error",
      data: response,
      error: null,
    });
  } catch (error) {
    return res.json({
      message: "error",
      data: null,
      error: error.message,
    });
  }
});

module.exports = router;
