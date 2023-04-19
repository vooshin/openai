const router = require("express").Router();
const {
  getSentimentOfReview,
  getSentimentOfReviewWithMultiLabel,
  getSentimentOfReviewWithMultiLabel2,
} = require("../src/sentiment");
const { getMultiLabelReview } = require("../src/multilable");
const {
  mapOrdersItems,
  mapOrdersItemsOutletWise,
  mapOrdersItemsOutletWiseWithItemDetails,
  outletWiseItemDetails,
  itemWiseDetails,
} = require("../src/mapOrdersItems");
const { getTrendInsights } = require("../src/trendsInsights");
const {getFeedbackInsights} = require("../src/feedbackInsights");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/sentiment", async (req, res) => {
  const response = await getSentimentOfReview();
  return res.json({
    message: "sentiment",
    data: response,
  });
});
router.get("/sentiment/1", async (req, res) => {
  const response = await getSentimentOfReviewWithMultiLabel();
  return res.json({
    message: "sentiment",
    data: response,
  });
});
router.get("/sentiment/2", async (req, res) => {
  const response = await getSentimentOfReviewWithMultiLabel2();
  return res.json({
    message: "sentiment",
    data: response,
  });
});

router.get("/multilabel", async (req, res) => {
  const response = await getMultiLabelReview();
  return res.json({
    message: "multilabel",
    data: response,
  });
});

router.get("/item-wise", (req, res) => {
  const response = itemWiseDetails();
  res.json({
    message: "item",
    data: response,
  });
});
router.get("/outlet-wise-item", (req, res) => {
  const response = outletWiseItemDetails();
  console.log("response", response);
  res.json({
    message: "outlet",
    data: response,
  });
});

router.get("/trends-insights", async (req, res) => {
  const response = await getTrendInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});
router.get("/feedback-insights", async (req, res) => {
  const response = await getFeedbackInsights();
  return res.json({
    message: "insights",
    data: response,
  });
});



module.exports = router;
