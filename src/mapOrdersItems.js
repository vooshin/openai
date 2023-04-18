const orderItems = require("../data/orderItemDetails.json");
const { LABELED_ORDERS } = require("../data/labeledOrderDetails");
const outlet = require("../demo/outletWiseMapped");
const customMapper = () => {
  const object = {};
  orderItems.forEach((labeledOrder) => {
    const { delivery_uuid } = labeledOrder;
    if (!object[delivery_uuid]) {
      object[delivery_uuid] = [];
    }
    object[delivery_uuid].push(labeledOrder);
  });
  return object;
};

module.exports = {
  mapOrdersItems: () => {
    const finalData = [];
    const customObject = customMapper();

    LABELED_ORDERS.forEach((orderItem) => {
      const { delivery_uuid } = orderItem;
      finalData.push({
        ...orderItem,
        items: customObject[delivery_uuid],
      });
    });
    return finalData;
  },
  mapOrdersItemsOutletWise: () => {
    const seenOutlets = {};
    const customObject = customMapper();

    LABELED_ORDERS.forEach((orderItem) => {
      const { delivery_uuid, listing_id: outlet_id } = orderItem;
      if (!seenOutlets[outlet_id]) {
        seenOutlets[outlet_id] = {};
      }
      if (!seenOutlets[outlet_id][delivery_uuid]) {
        seenOutlets[outlet_id][delivery_uuid] = {};
      }

      seenOutlets[outlet_id][delivery_uuid] = {
        ...orderItem,
        items: customObject[delivery_uuid],
      };
    });

    return seenOutlets;
  },

  mapOrdersItemsOutletWiseWithItemDetails: () => {
    //  clone outlet
    const finalData = { ...outlet };

    const countItem = (items) => {
      const itemDetails = {};

      items.forEach((element) => {
        const { item_id, item_name } = element;
        if (!itemDetails[item_id]) {
          itemDetails[item_id] = {
            name: item_name,
            count: 1,
          };
        } else {
          itemDetails[item_id].count += 1;
        }
      });
      return itemDetails;
    };

    Object.keys(finalData).forEach((listing_id) => {
      // grab order ids for each outlet
      let orderIds = Object.keys(finalData[listing_id]);
      // remove null key and '' from order ids
      orderIds = orderIds.filter(
        (orderId) => orderId !== "null" && orderId.length > 3
      );
      //grab items inside each order object
      const items = [];
      orderIds.forEach((orderId) => {
        console.log("orderId", orderId);
        const currObject = finalData[listing_id][orderId];
        console.log("currObject", currObject);
        const { items: order_items } = currObject;
        items.push(...order_items);
      });

      // count items
      const itemDetails = countItem(items);
      finalData[listing_id].itemDetails = itemDetails;
    });

    return finalData;
  },
};
