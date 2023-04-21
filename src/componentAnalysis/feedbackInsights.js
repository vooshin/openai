const { getOpenAIResponse } = require("../openai/fetchResponse");
// ----------------- prompt and sample data -----------------
const feedback_data = [
  {
    name: "Orange Tree Cafe Restaurant-Bedhead Burritos and Bowls",
    feedback:
      "first time trying this place and my burrito is missing half the ingredients lol..",
    order_id: "a0f74fc8",
    rating: 1,
    outlet: "P0251",
    channel: "DOORDASH",
  },
  {
    name: "Cameo Restaurant-House of Parm",
    feedback: "great tasting food, but very small quantities for the price.",
    order_id: "38a24563",
    rating: 3,
    outlet: "P0232",
    channel: "DOORDASH",
  },
  {
    name: "Red Olive Restaurant - Michigan-House of Parm",
    feedback:
      "The pasta taste like it was very undercooked and it was very chalky and pasty. And for $18. I expected a little bit more on the portion. ",
    order_id: "0f46d3ce",
    rating: 1,
    outlet: "P0272",
    channel: "UBEREATS",
  },
  {
    name: "Leo s Coney Island - Clio-Bedhead Burritos and Bowls",
    feedback:
      "1st time trying this. they messed up the order and switched the burritos around.",
    order_id: "596c28cf",
    rating: 1,
    outlet: "P0161",
    channel: "DOORDASH",
  },
  {
    name: "Leo s Coney Island - Miller Rd-House of Parm",
    feedback:
      "completely messed up our order and we were not allowed a redelivery thanks to the doordash policy",
    order_id: "5aa4a23e",
    rating: 1,
    outlet: "P0202",
    channel: "DOORDASH",
  },
  {
    name: "River Diner-Bedhead Burritos and Bowls",
    feedback: "it was very tasty and flavorful would definitely recommend.",
    order_id: "5da78f45",
    rating: 5,
    outlet: "P0292",
    channel: "DOORDASH",
  },
  {
    name: "Red Olive Restaurant - Michigan-Bedhead Burritos and Bowls",
    feedback:
      "unfortunately they gave me two of the same tacos. we didn't get our hangover the hangover burrito ",
    order_id: "c7530b40",
    rating: 2,
    outlet: "P0271",
    channel: "DOORDASH",
  },
  {
    name: "Leo s Coney Island - Miller Rd-Bedhead Burritos and Bowls",
    feedback:
      "nothing special, not enough feta cheese. probably would not order that bowl again. ",
    order_id: "212cf3da",
    rating: 3,
    outlet: "P0201",
    channel: "DOORDASH",
  },
  {
    name: "Moe s Place-Cheesesteak Daddy",
    feedback:
      "the bacon cheeseburger philly was so fire! huge portion. hot, fresh and tasty. gotta give this spot a try! ",
    order_id: "d7d30112",
    rating: 5,
    outlet: "P0301",
    channel: "DOORDASH",
  },
  {
    name: "River Diner-House of Parm",
    feedback:
      "ragu space sauce is better than this, noodles over cooked. no bread. no cutlery provided. overall very, very disappointing. sad ",
    order_id: "8375903c",
    rating: 1,
    outlet: "P0291",
    channel: "DOORDASH",
  },
  {
    name: "Cameo Restaurant-Bedhead Burritos and Bowls",
    feedback:
      "forgot my cream cheese and the oj spilled all over everything so can't even eat it. ",
    order_id: "ae03aa4d",
    rating: 1,
    outlet: "P0231",
    channel: "DOORDASH",
  },
  {
    name: "Cameo Restaurant-Bedhead Burritos and Bowls",
    feedback:
      "the wake n' bake burrito slapped hard. definitely a good snack for after a sesh! really lives up to its name!",
    order_id: "9dc45dc9",
    rating: 5,
    outlet: "P0231",
    channel: "DOORDASH",
  },
  {
    name: "Leos Coney Island-West Bloomfield-Cheeky Bird",
    feedback:
      "no marinara sauce on my chicken parm.  no drink either. , No marinara sauce.",
    order_id: "13da0dba",
    rating: 1,
    outlet: "P0083",
    channel: "UBEREATS",
  },
  {
    name: "Red Olive Restaurant - Michigan-House of Parm",
    feedback:
      "part of my order did not arrive and no one answered when i called for a refund on that part of the order. ",
    order_id: "ed1c0e9d",
    rating: 1,
    outlet: "P0272",
    channel: "DOORDASH",
  },
  {
    name: "Moe s Place-Cheesesteak Daddy",
    feedback: "soooo dang good! best cheesesteak outside around!",
    order_id: "d7c9771d",
    rating: 5,
    outlet: "P0301",
    channel: "DOORDASH",
  },
  {
    name: "Red Olive Restaurant - Ferndale-Bedhead Burritos and Bowls",
    feedback:
      "paid $3.49 for orange juice have the tiniest cup in the world and with apple juice. i want my money back this is ridiculous.",
    order_id: "f7e8cd64",
    rating: 1,
    outlet: "P0181",
    channel: "DOORDASH",
  },
  {
    name: "Red Olive Restaurant - Ferndale-Bedhead Burritos and Bowls",
    feedback:
      "items were not included in my order aaand items were not as described either. ordered a bagel with cream cheese and didn't get the cream cheese. ordered the basic b*tch bowl and received hash browns instead of tots. i was very disappointed. won't be coming back.",
    order_id: "6ad78e80",
    rating: 1,
    outlet: "P0181",
    channel: "DOORDASH",
  },
  {
    name: "Moe s Place-Cheesesteak Daddy",
    feedback: "Meat was overcooked, and dry bread was tough",
    order_id: "d502f208",
    rating: 3,
    outlet: "P0301",
    channel: "GRUBHUB",
  },
  {
    name: "Orange Tree Cafe Restaurant-House of Parm",
    feedback:
      "awful! we paid the upcharge for chicken on both of our pastas and both came with no chicken. the portions were small like for a kid! very bland pasta.  21 dollars each and not worth it at all. please save your money! awful establishment!!",
    order_id: "9d28b382",
    rating: 1,
    outlet: "P0252",
    channel: "DOORDASH",
  },
  {
    name: "Classic Lanes-Cheeky Bird",
    feedback:
      "didnt get the cookie didnt get the extra bacon or cheese on sandwich ",
    order_id: "58cd3ccc",
    rating: 1,
    outlet: "P0241",
    channel: "DOORDASH",
  },
  {
    name: "Moe s Place-Cheesesteak Daddy",
    feedback: "good food",
    order_id: "2a116806",
    rating: 5,
    outlet: "P0301",
    channel: "DOORDASH",
  },
  {
    name: "Leo s Coney Island - Miller Rd-House of Parm",
    feedback:
      "this isn't house of parm it's leo's. portions are basically side dishes for 12.99. wasn't hot, wasn't even worth the money and false advertising on location as well. 100% don't recommend.",
    order_id: "137126c3",
    rating: 1,
    outlet: "P0202",
    channel: "DOORDASH",
  },
  {
    name: "River Diner-Bedhead Burritos and Bowls",
    feedback:
      "way overpriced and over seasoned! save your money and buy taco bell. ",
    order_id: "40518670",
    rating: 1,
    outlet: "P0292",
    channel: "DOORDASH",
  },
  {
    name: "Bigtime Market-Cheesesteak Daddy",
    feedback: "was very dry, tasted over cooked, and the bread was rough ",
    order_id: "800b5272",
    rating: 3,
    outlet: "P0021",
    channel: "UBEREATS",
  },
];
const PROMPT = `Provide a statistical analysis for the feedback data,
    for bad feedback, provide a list of reasons why the feedback is bad, and also check how many times same reason is repeated. the response should be of 30 words or less. make it like i am asking you to provide a report on the feedback data and im restaurant owner.`;

// -----------------------------------------------------------

module.exports = {
  getFeedbackInsights: async () => {
    const data = await getOpenAIResponse(feedback_data, PROMPT, "feedback");
    if (!data.status) {
      return {
        status: false,
        error: data.error,
      };
    }
    return {
      status: true,
      data: data.response,
      //   response_two: response_two.response,
    };
  },
};
