const router = require("express").Router();
const {
  itemWiseDetails,
  feedbackItemMap,
  OrderAndFeedbackItemMap,
  itemWiseClassification
} = require("../../src/ordersItemClassification/orderItems");



// Todo: not much usefull
router.get("/item-classification", async (req, res) => {
  const data = await itemWiseClassification();
  res.json({
    data,
  });
});
router.get("/itemDetails", async (req, res) => {
  const data = await itemWiseDetails();
  res.json({
    data,
  });
});
router.get("/feedback-item-map", async (req, res) => {
  const data = await feedbackItemMap();
  res.json({
    data,
  });
});
router.get("/order-item-map", async (req, res) => {
  const data = await OrderAndFeedbackItemMap();
  res.json({
    data,
  });
});

module.exports = router;
