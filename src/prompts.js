const DEFAULT_PROMPT = `Do a sentiment analysis in the provided message if it is negative or neutral, can you do a multi-label classification on these labels Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue, Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue, Out of Stock Issue, Foreign Object Issue. Please provide a percentage matching of each labels and make it into JSON format and the response should be under 4000 tokens`;

const promptAspect = `
First do a sentiment analysis on the feedback, \n
then for the negative or neutral sentiment reviews run a multi-label classification \n
on the text feedback and the rating provided in the data for classification \n
Consider these 18 labels to be classified on the feedback and the rating which are as follows:\n 
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery Issue, Late Order Issue,Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue. Give me the percentage of matching of reviews to labels \n
`;
const promptAspect2 = `Perform a Step by Step process for the review and rating, \n
Step 1: Perform a Sentiment Analysis on the Feedback provided  \n
Step 2: Separate the review on the basis of sentiment \n
Step 3:  If the review is negative or neutral then perform a aspect based classification considering the following labels as aspect. \n
The labels are Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
Step 4: For each label make a percentage of aspect labels matching in the review\n
Step 5: Create a json with each label as a key and the percentage matching as the value. \n
`;

const promptOfReview = `Consider yourself as text classification model, you can classify the review on the basis of sentiment and aspect. \n
Consider the following labels for sentiment classification: \n
Positive, Negative, Neutral \n
Consider the following labels for aspect classification: \n
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
`;
const promptForMultipleReview = `Consider yourself as text classification model, you can classify the review on the basis of sentiment and aspect. \n
Consider the following labels for sentiment classification: \n
Positive, Negative, Neutral \n
Consider the following labels for aspect classification: \n
Quality Issue, Quantity Issue, Taste Issue, Packaging Issue, Delivery & Timing Issue, Price Issue, Cooking Issue, Freshness Issue,\n
Stalenes Issue, Hardness Issue, Spice Issue, Temperature Issue, Wrong Food Issue, Hygiene Issue, Missing Food Issue, Oiliness Issue,\n
Out of Stock Issue, Foreign Object Issue \n
`;
const reviewAndSales = `Consider yourself among the best statistian in the world for the online food industry. On the Following Data please provide some insights or correlation between data, create some kind some kind of comparison which can show in graph chart or in from of key value pair. and also try to predict the sales`;

const sampleData = `review: only giving one star because it wasn't an option for none..... steak extremely overcooked/burnt and dry.... tried to submit a complaint with no response and no one answers the phone number listed.... definitely won't order ever again

ai response: Sentiment Analysis: Negative
Multi-label Classification Results:
{
  "Quality Issue": 100,
  "Quantity Issue": 0,
  "Taste Issue": 100,
  "Packaging Issue": 0,
  "Delivery & Timing Issue": 0,
  "Price Issue": 0,
  "Cooking Issue": 100,
  "Freshness Issue": 0,
  "Staleness Issue": 100,
  "Hardness Issue": 100,
  "Spice Issue": 0,
  "Temperature Issue": 100,
  "Wrong Food Issue": 0,
  "Hygiene Issue": 0,
  "Missing Food Issue": 0,
  "Oiliness Issue": 0,
  "Out of Stock Issue": 0,
  "Foreign Object Issue": 0
}
`;

const part2 = `What insights can be gained from analyzing a negative customer review, specifically one that mentions issues with the quality of the food, communication problems with the restaurant, and a loss of customer loyalty, and how can these insights be used to improve the overall customer experience and prevent negative reviews from impacting the restaurant's reputation?`;

module.exports = {
  promptAspect,
  promptAspect2,
  promptOfReview,
  promptForMultipleReview,
  reviewAndSales,
  DEFAULT_PROMPT,
};
