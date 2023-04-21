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

      let listOfIssueItems = Object.values(itemDetails);
      // sort items by count
      listOfIssueItems.sort((a, b) => b.count - a.count);
      // const itemsAndCount = listOfIssueItems.map(i=>({[i.name]:i.count}))
      const names = listOfIssueItems.map((item) => item.name);
      return { itemDetails, listOfIssueItems, names };
    };

    Object.keys(finalData).forEach((listing_id) => {
      // grab order ids for each outlet
      let orderIds = Object.keys(finalData[listing_id]);
      // remove null key and '' from order ids
      orderIds = orderIds.filter(
        (orderId) =>
          orderId !== "null" &&
          orderId.length > 3 &&
          orderId !== "66b0e062-cd7c-11ed-a063-7344742c940e" &&
          orderId !== "558fe36a-69f5-442d-a5ec-84b409be6bf3" &&
          orderId !== "94c12af6-219c-4886-9699-ac6a8ad87df4"
      );
      //grab items inside each order object
      const items = [];
      orderIds.forEach((orderId) => {
        // console.log("orderId", orderId);
        const currObject = finalData[listing_id][orderId];
        // console.log("currObject", currObject);
        const { items: order_items } = currObject;
        items.push(...order_items);
      });

      // count items
      const { itemDetails, listOfIssueItems, names } = countItem(items);
      finalData[listing_id].itemDetails = itemDetails;
      finalData[listing_id].listOfIssueItems = listOfIssueItems;

      finalData[listing_id].names = names;
    });
    //  only keep itemDetails and names
    const finalData2 = {};
    Object.keys(finalData).forEach((listing_id) => {
      const delivery_uuids = Object.keys(finalData[listing_id]);
      const delivery_uuids_filtered = delivery_uuids.filter(
        (delivery_uuid) =>
          delivery_uuid !== "itemDetails" &&
          delivery_uuid !== "listOfIssueItems" &&
          delivery_uuid !== "names"
      );

      const reviews = delivery_uuids_filtered.map(
        (delivery_uuid) => finalData[listing_id][delivery_uuid].review
      );

      finalData2[listing_id] = {
        itemDetails: finalData[listing_id].itemDetails,
        names: finalData[listing_id].names,
        review: reviews,
      };
    });

    return finalData2;
  },
  outletWiseItemDetails: () => {
    // outlet wise item
    let outletWiseItem = {};

    Object.keys(outlet).forEach((listing_id) => {
      const curr_listing_data = outlet[listing_id];
      let delivery_uuids = Object.keys(curr_listing_data);
      delivery_uuids = delivery_uuids.filter(
        (id) =>
          id !== "null" &&
          id.length > 3 &&
          id !== "66b0e062-cd7c-11ed-a063-7344742c940e" &&
          id !== "558fe36a-69f5-442d-a5ec-84b409be6bf3" &&
          id !== "94c12af6-219c-4886-9699-ac6a8ad87df4"
      );
      let issues = {};
      delivery_uuids.forEach((delivery_uuid) => {
        const curr_delivery_uuid_data = curr_listing_data[delivery_uuid];
        const multi_label = curr_delivery_uuid_data.multi_label;

        if (Object.keys(issues).length === 0) {
          issues = Object.keys(multi_label).reduce((acc, curr) => {
            acc[curr] = 0;
            return acc;
          }, {});
        }
        Object.entries(multi_label).forEach(([label, value]) => {
          issues[label] += value;
        });
      });

      let top_label = [];
      Object.entries(issues).forEach(([label, value]) => {
        if (value !== 0) {
          top_label.push({ label, value });
        }
      });

      // sort labels by value
      top_label.sort((a, b) => b.value - a.value);

      outletWiseItem[listing_id] = {
        issues,
        top_issues: top_label.map((i) => i.label),
      };
    });
    return outletWiseItem;
  },
  outletWiseItemDetailsX: () => {
    // outlet wise item
    let outletWiseItem = {};

    Object.keys(outlet).forEach((listing_id) => {
      const curr_listing_data = outlet[listing_id];
      let delivery_uuids = Object.keys(curr_listing_data);
      delivery_uuids = delivery_uuids.filter(
        (id) =>
          id !== "null" &&
          id.length > 3 &&
          id !== "66b0e062-cd7c-11ed-a063-7344742c940e" &&
          id !== "558fe36a-69f5-442d-a5ec-84b409be6bf3" &&
          id !== "94c12af6-219c-4886-9699-ac6a8ad87df4"
      );
      let issues = {};
      let issue_items = {};
      delivery_uuids.forEach((delivery_uuid) => {
        const curr_delivery_uuid_data = curr_listing_data[delivery_uuid];
        const multi_label = curr_delivery_uuid_data.multi_label;
        const items = curr_delivery_uuid_data.items;

        items.map((itemObject) => {
          const { item_name } = itemObject;
          if (!issue_items[item_name]) {
            issue_items[item_name] = 0;
          }
          issue_items[item_name] += 1;
        });

        if (Object.keys(issues).length === 0) {
          issues = Object.keys(multi_label).reduce((acc, curr) => {
            acc[curr] = 0;
            return acc;
          }, {});
        }
        Object.entries(multi_label).forEach(([label, value]) => {
          issues[label] += value;
        });
      });

      let top_label = [];
      Object.entries(issues).forEach(([label, value]) => {
        if (value !== 0) {
          top_label.push({ label, value });
        }
      });

      // sort labels by value
      top_label.sort((a, b) => b.value - a.value);

      outletWiseItem[listing_id] = {
        issues,
        issue_items: Object.keys(issue_items).map((item_name, count) => item_name),
        top_issues: top_label.map((i) => i.label),
      };
    });
    return outletWiseItem;
  },
  itemWiseDetails: () => {
    let itemWiseIssues = {};
    let itemWiseIssuesList = [];
    Object.keys(outlet).forEach((listing_id) => {
      const curr_listing_data = outlet[listing_id];
      let delivery_uuids = Object.keys(curr_listing_data);
      delivery_uuids = delivery_uuids.filter(
        (id) =>
          id !== "null" &&
          id.length > 3 &&
          id !== "66b0e062-cd7c-11ed-a063-7344742c940e" &&
          id !== "558fe36a-69f5-442d-a5ec-84b409be6bf3" &&
          id !== "94c12af6-219c-4886-9699-ac6a8ad87df4"
      );

      let reviews = delivery_uuids.map((delivery_uuid) => {
        const curr_delivery_uuid_data = curr_listing_data[delivery_uuid];
        const multi_label = curr_delivery_uuid_data.multi_label;
        const items = curr_delivery_uuid_data.items;
        const itemWithLabels = items.forEach((i) => {
          const { item_id, item_name } = i;

          itemWiseIssuesList.push({
            delivery_uuid,
            item_id,
            item_name,
            //  score,
            //  top_issues: top_label.map((i) => i.label),
            issues: multi_label,
          });
        });
      });
    });

    itemWiseIssuesList.forEach((item) => {
      const { item_name, issues } = item;

      if (!itemWiseIssues[item_name]) {
        itemWiseIssues[item_name] = {
          count: 1,
          issues: Object.assign({}, issues),
          top_issues: [],
        };
      } else {
        itemWiseIssues[item_name].count += 1;
        Object.keys(issues).forEach((issue) => {
          itemWiseIssues[item_name].issues[issue] += issues[issue];
        });
      }
    });

    Object.keys(itemWiseIssues).forEach((item_name) => {
      const { issues } = itemWiseIssues[item_name];
      let top_label = [];
      Object.entries(issues).forEach(([label, value]) => {
        if (value !== 0) {
          top_label.push({ label, value });
        }
      });

      // sort labels by value
      top_label.sort((a, b) => b.value - a.value);

      itemWiseIssues[item_name].top_issues = top_label.map((i) => i.label);
    });

    return itemWiseIssues;
  },
};
