const router = require("express").Router();
const componentAnalysis = require("./componentAnalysis");
const ordersItemClassification = require("./ordersItemClassification/orderItems");
// const {
//   getSentimentOfReview,
//   getSentimentOfReviewWithMultiLabel,
//   getSentimentOfReviewWithMultiLabel2,
// } = require("../src/sentiment");
// const { getMultiLabelReview } = require("../src/multilable");
// const {
//   mapOrdersItems,
//   mapOrdersItemsOutletWise,
//   mapOrdersItemsOutletWiseWithItemDetails,
//   outletWiseItemDetails,
//   outletWiseItemDetailsX,
//   itemWiseDetails,
// } = require("../src/mapOrdersItems");

router.use("/component-analysis", componentAnalysis);
router.use("/orders-item-classification", ordersItemClassification);

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    data:{}
  });
});

// router.get("/sentiment", async (req, res) => {
//   const response = await getSentimentOfReview();
//   return res.json({
//     message: "sentiment",
//     data: response,
//   });
// });
// router.get("/sentiment/1", async (req, res) => {
//   const response = await getSentimentOfReviewWithMultiLabel();
//   return res.json({
//     message: "sentiment",
//     data: response,
//   });
// });
// router.get("/sentiment/2", async (req, res) => {
//   const response = await getSentimentOfReviewWithMultiLabel2();
//   return res.json({
//     message: "sentiment",
//     data: response,
//   });
// });

// router.get("/multilabel", async (req, res) => {
//   const response = await getMultiLabelReview();
//   return res.json({
//     message: "multilabel",
//     data: response,
//   });
// });

// router.get("/item-wise", (req, res) => {
//   const response = itemWiseDetails();
//   res.json({
//     message: "item",
//     data: response,
//   });
// });
// router.get("/outlet-wise-item", (req, res) => {
//   const response = outletWiseItemDetailsX();
//   console.log("response", response);
//   res.json({
//     message: "outlet",
//     data: response,
//   });
// });

module.exports = router;
