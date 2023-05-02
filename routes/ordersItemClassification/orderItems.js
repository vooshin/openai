const router = require("express").Router();
const {
    itemWiseDetails,
} = require("../../src/ordersItemClassification/orderItems");


router.get("/itemDetails", async (req, res) => {
    const data = await itemWiseDetails();
    res.json({
        data,
    })
    }
);


module.exports = router;