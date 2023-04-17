const router = require("express").Router();
const { getSentimentOfReview } = require("../src/sentiment");

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

module.exports = router;
