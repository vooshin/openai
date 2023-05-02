const orderDetails = require("../../data/allOrdersAndItems.json");


module.exports = {
    itemWiseDetails:async()=>{
        return orderDetails;
    }
}
