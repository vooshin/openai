const { getOpenAIResponse } = require("../openai/fetchResponse");
const orderDetails = require("../../data/allOrdersAndItems.json");
// const feedbackAndItems = require("../../data/feedbackItems.json");
const feedbackAndItemsRaw = require("../../data/feedbackAndItemsRaw.json");
const feedbackAndItemsRaw2 = require("../../data/feedbackAndItemsRaw2.json");
const feedbackAndItems = require("../../data/feedbackAndItems.json");

// const PROMPT = `I have order details, in which user provided feedback. we also have item wise details and review details. by looking into the feedback we have to find out user mentioned which item in the feedback.`;

const PROMPT = `suppose u have order details, in which user provided feedback/review for the order. we know what items where there in the order, so now by looking into the feedback u have to find out user mentioned which item in this particular feedback. and response should be like this; {item_names: ["item1", "item2"], review: "feedback text", "delivery_uuid": xyz, item_ids:[12,32]}.
example: input: {review: {order_feedback:"everything inside of the burrito tasted stale or rotten. i couldn(@single_quotes@)t even finish the first bite", "delivery_uuid":"346baad0-f678-4941-8b02-4f31306c60d6"},
"itemNames": ["The Frito Bandito","The Philly Po(@single_quotes@) Boy"]
};
output:{item_names: ["Burrito"],review: "everything inside of the burrito tasted stale or rotten. i couldn(@single_quotes@)t even finish the first bite","item_ids":["f802c14d-7a7f-4cd5-beeb-4696d89f2054"]};
also you have to take the name of the item from the itemNames array and item_ids from the itemAndIdMap array, if name not present then put a empty array []
in response only pass the object like this, {"item_names": ["item1", "item2"], "review": "feedback"}
`;

const PROMPT_ITEM_CLASSIFICATION = `try using Named entity recognition, into the order feedback, and find out which item is mentioned in the feedback, all the items names are present in the itemNames array, u can also look into itemAndIdMap object item name is mapped with respective item id. price and quantity. give the response in form of object;
example: {
  "review": "feedback"
  "item_names": ["item1", "item2"],
  full_item_details: [{item_name: "item1", item_id: "item_id", item_price: "item_price", item_quantity: "item_quantity"}]
};

suppose if u dnt have any possible match then u can give response like this;
{
  "review": "feedback"
  "item_names": [],
  full_item_details: []
}
`;

module.exports = {
  itemWiseDetails: async () => {
    const demo = orderDetails.filter(
      (i) =>
        i.review.order_feedback != null &&
        i.review.order_feedback != "null" &&
        !isNaN(i.review.order_ratings) &&
        parseInt(i.review.order_ratings) < 4
    );
    const array = [];
    for (let i = 0; i < demo.length; i++) {
      const c_data = demo[i];

      const customPayload = {
        itemNames: c_data.itemNames,
        review: c_data.review.order_feedback,
        order_ratings: c_data.review.order_ratings,
        delivery_uuid: c_data.review.delivery_uuid,
        itemAndIdMap: c_data.allItemsDetails.map((item) => ({
          [item.item_name]: item.item_id,
        })),
      };
      const data = await getOpenAIResponse(
        customPayload ? customPayload : {},
        PROMPT,
        "feedback-item-map"
      );
      if (!data.status) {
        continue;
      }

      array.push({
        i,
        data,
      });
    }
    return array;
  },
  itemWiseClassification: async () => {
    const demo = orderDetails
      .filter(
        (i) =>
          i.review.order_feedback != null &&
          i.review.order_feedback != "null" &&
          !isNaN(i.review.order_ratings) &&
          parseInt(i.review.order_ratings) < 4
      )
      .slice(0, 10);
    const finalResponseList = [];
    for (let i = 0; i < demo.length; i++) {
      const objectData = demo[i];

      const customPayload = {
        itemNames: objectData.itemNames,
        review: objectData.review.order_feedback,
        order_ratings: objectData.review.order_ratings,
        delivery_uuid: objectData.review.delivery_uuid,
        itemAndIdMap: objectData.allItemsDetails.map((item) => ({
          [item.item_name]: {
            item_id: item.item_id,
            item_price: item.item_price,
            item_quantity: item.item_quantity,
          },
        })),
      };
      const data = await getOpenAIResponse(
        customPayload ? customPayload : {},
        PROMPT_ITEM_CLASSIFICATION,
        "feedback-item-classification"
      );
      if (!data.status) {
        console.log(
          `Error: ${data.error} \n>>> review: ${objectData.review.order_feedback} \n>>> i: ${i}`
        );
        continue;
      }

      finalResponseList.push({
        i,
        data,
      });
    }
    return finalResponseList;
  },
  feedbackItemMap: async () => {
    const x = feedbackAndItemsRaw.data;
    const y = x.map((item) => {
      try {
        const { data } = item;
        let { response } = data;

        const output = response.replace(/(\n|\t)/g, "").replace(/\s+/g, " ");

        const firstIndex = output.indexOf("{");
        const lastIndex = output.lastIndexOf("}");

        let finalOutput = output.substring(firstIndex, lastIndex + 1);
        const text = finalOutput;

        const a = text.split("output:");
        const b = text.split("Output:");

        if (a.length && a.length > 1) {
          finalOutput = a[1];
        } else if (b.length && b.length > 1) {
          finalOutput = b[1];
        }

        if (
          finalOutput.includes(
            `output: {item_names: ["Wake n(@single_quotes@) Bake Burrito"], review: "ordered two wake n bake burritos, did not come with ground beef like listed, what(@single_quotes@)s going on??", "delivery_uuid": "9f81586b-144a-43ce-b8d4-ee1aabdd26fe", item_ids:["3000005697686730"]}`
          )
        ) {
          console.log("finalOutput: .......");
        }
        const samp = JSON.parse(finalOutput);

        return samp;
      } catch (error) {
        // console.log(`Error: ${error}`);
        // if the string is not in the format of a JSON, then return the string as it is
        // console.log(`item.data.response: ${item.data.response}`);

        const output = item.data.response
          .replace(/(\n|\t)/g, "")
          .replace(/\s+/g, " ");
        const firstIndex = output.indexOf("{");
        const lastIndex = output.lastIndexOf("}");
        let finalOutput = output.substring(firstIndex, lastIndex + 1);
        const text = finalOutput;

        console.log(`yoooo: ${text}`);

        return item.data.response;
      }
    });
    return y;
  },
  OrderAndFeedbackItemMap: async () => {
    const demo = orderDetails.filter(
      (i) =>
        i.review.order_feedback != null &&
        i.review.order_feedback != "null" &&
        !isNaN(i.review.order_ratings) &&
        parseInt(i.review.order_ratings) < 4
    );
    const feedbackAndItemsFiltered = feedbackAndItems.data.filter(
      (item) => typeof item === "object"
    );
    const tempMap = {};
    feedbackAndItemsFiltered.forEach((item) => {
      const { delivery_uuid } = item;
      if (!tempMap[delivery_uuid]) {
        tempMap[delivery_uuid] = item;
      } else console.log(`duplicate: ${delivery_uuid}`);
    });
    const finalPayload = [];
    demo.forEach((item) => {
      const { review, allItemsDetails, itemNames } = item;
      const { delivery_uuid, order_date, listing_id, channel } = review;

      const object = {
        listing_id,
        delivery_uuid,
        order_date,
        channel,
        overall_order_review: review.order_feedback,
        order_ratings: review.order_ratings,
        predicted_items: tempMap[delivery_uuid]?.item_names ?? null,
        predicted_item_ids: tempMap[delivery_uuid]?.item_ids ?? null,

        ordered_items: itemNames,
        all_ordered_item_details: allItemsDetails.map((item) => ({
          delivery_uuid: item.delivery_uuid,
          listing_id: item.listing_id,
          item_id: item.item_id,
          item_name: item.item_name,
          item_price: item.item_price,
        })),
      };
      finalPayload.push(object);
      item.feedbackItemInfo = tempMap[delivery_uuid];
    });

    return finalPayload;
  },
};

const payload = [
  {
    tier: 1,
    listingIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    tier: 2,
    listingIds: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  },
  {
    tier: 1,
    listingIds: [90, 34],
  },
  {
    tier: 3,
    listingIds: [290, 734],
  },
  {
    tier: 3,
    listingIds: [11, 56],
  },
];
