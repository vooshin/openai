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
  mapOrdersItemsOutletWiseWithItemDetails
} = require("../src/mapOrdersItems");

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

router.get("/item", (req, res) => {
  const response = mapOrdersItems();
  res.json({
    message: "item",
    data: response,
  });
});
router.get("/outlet-wise", (req, res) => {
  const response = mapOrdersItemsOutletWise();
  console.log("response", response);
  res.json({
    message: "item",
    data: response,
  });
});
router.get("/outlet-wise-items", (req, res) => {
  const response = mapOrdersItemsOutletWiseWithItemDetails();
  console.log("response", response);
  res.json({
    message: "item",
    data: response,
  });
});

module.exports = router;
