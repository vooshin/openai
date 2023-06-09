const { getOpenAIResponse } = require("../openai/fetchResponse");
// ----------------- prompt and sample data -----------------
// serviceability_by_storeid for current period
const operations_serviceability_data_1 = {
  current_period: [{ start_date: "2023-03-18", end_date: "2023-04-17" }],

  serviceability_by_storeid: [
    {
      listing_id: "P0011",
      name: "Rockos Bar & Grill-Cheesesteak Daddy",
      total_rate: 3431.33,
      total_count: 44,
      avg_rate: 77.98,
    },
    {
      listing_id: "P0012",
      name: "Rockos Bar & Grill-Pop s Meatball Sandwich",
      total_rate: 2938,
      total_count: 37,
      avg_rate: 79.41,
    },
    {
      listing_id: "P0013",
      name: "Rockos Bar & Grill-Cheeky Bird",
      total_rate: 2633.56,
      total_count: 34,
      avg_rate: 77.46,
    },
    {
      listing_id: "P0021",
      name: "Bigtime Market-Cheesesteak Daddy",
      total_rate: 3940,
      total_count: 41,
      avg_rate: 96.1,
    },
    {
      listing_id: "P0022",
      name: "Bigtime Market-Pop s Meatball Sandwich",
      total_rate: 3440,
      total_count: 35,
      avg_rate: 98.29,
    },
    {
      listing_id: "P0023",
      name: "Bigtime Market-Cheeky Bird",
      total_rate: 3240,
      total_count: 33,
      avg_rate: 98.18,
    },
    {
      listing_id: "P0031",
      name: "Overtyme Bar & Grill-Cheesesteak Daddy",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0032",
      name: "Overtyme Bar & Grill-Pop s Meatball Sandwich",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0041",
      name: "Southgate Grill-Cheesesteak Daddy",
      total_rate: 3114,
      total_count: 32,
      avg_rate: 97.31,
    },
    {
      listing_id: "P0042",
      name: "Southgate Grill-Pop s Meatball Sandwich",
      total_rate: 2914,
      total_count: 31,
      avg_rate: 94,
    },
    {
      listing_id: "P0043",
      name: "Southgate Grill-Cheeky Bird",
      total_rate: 3014,
      total_count: 31,
      avg_rate: 97.23,
    },
    {
      listing_id: "P0051",
      name: "Leos Coney Island-Dearborn-Cheesesteak Daddy",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0052",
      name: "Leos Coney Island-Dearborn-Pop s Meatball Sandwich",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0053",
      name: "Leos Coney Island-Dearborn-Cheeky Bird",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0061",
      name: "Good Vibes Lounge-Cheesesteak Daddy",
      total_rate: 2752,
      total_count: 33,
      avg_rate: 83.39,
    },
    {
      listing_id: "P0062",
      name: "Good Vibes Lounge-Pop s Meatball Sandwich",
      total_rate: 2261,
      total_count: 31,
      avg_rate: 72.94,
    },
    {
      listing_id: "P0071",
      name: "Johnnys On The Lake -Cheesesteak Daddy",
      total_rate: 3592,
      total_count: 39,
      avg_rate: 92.1,
    },
    {
      listing_id: "P0072",
      name: "Johnnys On The Lake -Pop s Meatball Sandwich",
      total_rate: 2230,
      total_count: 34,
      avg_rate: 65.59,
    },
    {
      listing_id: "P0081",
      name: "Leos Coney Island-West Bloomfield-Cheesesteak Daddy",
      total_rate: 3600,
      total_count: 37,
      avg_rate: 97.3,
    },
    {
      listing_id: "P0082",
      name: "Leos Coney Island-West Bloomfield-Pop s Meatball Sandwich",
      total_rate: 3300,
      total_count: 33,
      avg_rate: 100,
    },
    {
      listing_id: "P0083",
      name: "Leos Coney Island-West Bloomfield-Cheeky Bird",
      total_rate: 3400,
      total_count: 35,
      avg_rate: 97.14,
    },
    {
      listing_id: "P0091",
      name: "Fifth Avenue-Cheesesteak Daddy",
      total_rate: 2195,
      total_count: 35,
      avg_rate: 62.71,
    },
    {
      listing_id: "P0092",
      name: "Fifth Avenue-Pop s Meatball Sandwich",
      total_rate: 1990.87,
      total_count: 33,
      avg_rate: 60.33,
    },
    {
      listing_id: "P0101",
      name: "Detroit Grille House-Cheesesteak Daddy",
      total_rate: 4515.83,
      total_count: 46,
      avg_rate: 98.17,
    },
    {
      listing_id: "P0102",
      name: "Detroit Grille House-Pop s Meatball Sandwich",
      total_rate: 3719.86,
      total_count: 38,
      avg_rate: 97.89,
    },
    {
      listing_id: "P0111",
      name: "Gator Jakes Bar & Grill-Cheesesteak Daddy",
      total_rate: 4472,
      total_count: 45,
      avg_rate: 99.38,
    },
    {
      listing_id: "P0112",
      name: "Gator Jakes Bar & Grill-Pop s Meatball Sandwich",
      total_rate: 2754,
      total_count: 31,
      avg_rate: 88.84,
    },
    {
      listing_id: "P0113",
      name: "Gator Jakes Bar & Grill-Cheeky Bird",
      total_rate: 3275,
      total_count: 33,
      avg_rate: 99.24,
    },
    {
      listing_id: "P0121",
      name: "CK Diggs-Cheesesteak Daddy",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0122",
      name: "CK Diggs-Pop s Meatball Sandwich",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0131",
      name: "The Beach Tiki Bar-Cheesesteak Daddy",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0132",
      name: "The Beach Tiki Bar-Pop s Meatball Sandwich",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0141",
      name: "US 12 Bar and Grill-Cheesesteak Daddy",
      total_rate: 4908.68,
      total_count: 51,
      avg_rate: 96.25,
    },
    {
      listing_id: "P0142",
      name: "US 12 Bar and Grill-Pop s Meatball Sandwich",
      total_rate: 3320,
      total_count: 36,
      avg_rate: 92.22,
    },
    {
      listing_id: "P0143",
      name: "US 12 Bar and Grill-Cheeky Bird",
      total_rate: 3020,
      total_count: 31,
      avg_rate: 97.42,
    },
    {
      listing_id: "P0151",
      name: "Leos Coney Island-Ann Arbor-Cheesesteak Daddy",
      total_rate: 3400,
      total_count: 34,
      avg_rate: 100,
    },
    {
      listing_id: "P0152",
      name: "Leos Coney Island-Ann Arbor-Pop s Meatball Sandwich",
      total_rate: 3000,
      total_count: 30,
      avg_rate: 100,
    },
    {
      listing_id: "P0153",
      name: "Leos Coney Island-Ann Arbor-Cheeky Bird",
      total_rate: 3300,
      total_count: 33,
      avg_rate: 100,
    },
    {
      listing_id: "P0161",
      name: "Leo s Coney Island - Clio-Bedhead Burritos and Bowls",
      total_rate: 4330,
      total_count: 45,
      avg_rate: 96.22,
    },
    {
      listing_id: "P0162",
      name: "Leo s Coney Island - Clio-Cheeky Bird",
      total_rate: 3130,
      total_count: 32,
      avg_rate: 97.81,
    },
    {
      listing_id: "P0163",
      name: "Leo s Coney Island - Clio-House of Parm",
      total_rate: 4230,
      total_count: 43,
      avg_rate: 98.37,
    },
    {
      listing_id: "P0164",
      name: "Leo s Coney Island - Clio-Pop s Meatball Sandwich",
      total_rate: 2930,
      total_count: 30,
      avg_rate: 97.67,
    },
    {
      listing_id: "P0171",
      name: "8 Mile Grill & Restaurant-Cheeky Bird",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0172",
      name: "8 Mile Grill & Restaurant-Cheesesteak Daddy",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0173",
      name: "8 Mile Grill & Restaurant-Pop s Meatball Sandwich",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0181",
      name: "Red Olive Restaurant - Ferndale-Bedhead Burritos and Bowls",
      total_rate: 5030,
      total_count: 53,
      avg_rate: 94.91,
    },
    {
      listing_id: "P0182",
      name: "Red Olive Restaurant - Ferndale-House of Parm",
      total_rate: 4530,
      total_count: 47,
      avg_rate: 96.38,
    },
    {
      listing_id: "P0183",
      name: "Red Olive Restaurant - Ferndale-Pop s Meatball Sandwich",
      total_rate: 2037,
      total_count: 31,
      avg_rate: 65.71,
    },
    {
      listing_id: "P0191",
      name: "White Horse Tavern-Cheeky Bird",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0192",
      name: "White Horse Tavern-Cheesesteak Daddy",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0201",
      name: "Leo s Coney Island - Miller Rd-Bedhead Burritos and Bowls",
      total_rate: 4910,
      total_count: 51,
      avg_rate: 96.27,
    },
    {
      listing_id: "P0202",
      name: "Leo s Coney Island - Miller Rd-House of Parm",
      total_rate: 4210,
      total_count: 43,
      avg_rate: 97.91,
    },
    {
      listing_id: "P0203",
      name: "Leo s Coney Island - Miller Rd-Pop s Meatball Sandwich",
      total_rate: 3110,
      total_count: 33,
      avg_rate: 94.24,
    },
    {
      listing_id: "P0211",
      name: "Lucky s Hole In The Wall Sports Bar-Cheeky Bird",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0212",
      name: "Lucky s Hole In The Wall Sports Bar-Cheesesteak Daddy",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0213",
      name: "Lucky s Hole In The Wall Sports Bar-Pop s Meatball Sandwich",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0221",
      name: "Athena s Diner-Bedhead Burritos and Bowls",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0222",
      name: "Athena s Diner-House of Parm",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0223",
      name: "Athena s Diner-Pop s Meatball Sandwich",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0231",
      name: "Cameo Restaurant-Bedhead Burritos and Bowls",
      total_rate: 3298,
      total_count: 38,
      avg_rate: 86.79,
    },
    {
      listing_id: "P0232",
      name: "Cameo Restaurant-House of Parm",
      total_rate: 3201,
      total_count: 38,
      avg_rate: 84.24,
    },
    {
      listing_id: "P0233",
      name: "Cameo Restaurant-Pop s Meatball Sandwich",
      total_rate: 2701,
      total_count: 32,
      avg_rate: 84.41,
    },
    {
      listing_id: "P0241",
      name: "Classic Lanes-Cheeky Bird",
      total_rate: 3212,
      total_count: 35,
      avg_rate: 91.77,
    },
    {
      listing_id: "P0242",
      name: "Classic Lanes-Cheesesteak Daddy",
      total_rate: 4372,
      total_count: 45,
      avg_rate: 97.16,
    },
    {
      listing_id: "P0251",
      name: "Orange Tree Cafe Restaurant-Bedhead Burritos and Bowls",
      total_rate: 4357,
      total_count: 44,
      avg_rate: 99.02,
    },
    {
      listing_id: "P0252",
      name: "Orange Tree Cafe Restaurant-House of Parm",
      total_rate: 4157,
      total_count: 42,
      avg_rate: 98.98,
    },
    {
      listing_id: "P0253",
      name: "Orange Tree Cafe Restaurant-Pop s Meatball Sandwich",
      total_rate: 3157,
      total_count: 32,
      avg_rate: 98.66,
    },
    {
      listing_id: "P0261",
      name: "Leo s Coney Island - Ypsilanti-Bedhead Burritos and Bowls",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0262",
      name: "Leo s Coney Island - Ypsilanti-House of Parm",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0263",
      name: "Leo s Coney Island - Ypsilanti-Pop s Meatball Sandwich",
      total_rate: 2900,
      total_count: 29,
      avg_rate: 100,
    },
    {
      listing_id: "P0271",
      name: "Red Olive Restaurant - Michigan-Bedhead Burritos and Bowls",
      total_rate: 5113.74,
      total_count: 53,
      avg_rate: 96.49,
    },
    {
      listing_id: "P0272",
      name: "Red Olive Restaurant - Michigan-House of Parm",
      total_rate: 5100,
      total_count: 52,
      avg_rate: 98.08,
    },
    {
      listing_id: "P0273",
      name: "Red Olive Restaurant - Michigan-Pop s Meatball Sandwich",
      total_rate: 3000,
      total_count: 30,
      avg_rate: 100,
    },
    {
      listing_id: "P0292",
      name: "River Diner-Bedhead Burritos and Bowls",
      total_rate: 4564,
      total_count: 46,
      avg_rate: 99.22,
    },
    {
      listing_id: "P0293",
      name: "River Diner-Pop s Meatball Sandwich",
      total_rate: 2764,
      total_count: 28,
      avg_rate: 98.71,
    },
    {
      listing_id: "P0291",
      name: "River Diner-House of Parm",
      total_rate: 3874.9,
      total_count: 40,
      avg_rate: 96.87,
    },
    {
      listing_id: "P0301",
      name: "Moe s Place-Cheesesteak Daddy",
      total_rate: 3495,
      total_count: 39,
      avg_rate: 89.62,
    },
    {
      listing_id: "P0302",
      name: "Moe s Place-Pop s Meatball Sandwich",
      total_rate: 2303.45,
      total_count: 26,
      avg_rate: 88.59,
    },
    {
      listing_id: "P0303",
      name: "Moe s Place-Cheeky Bird",
      total_rate: 2708,
      total_count: 31,
      avg_rate: 87.35,
    },
  ],
};
//  serviceability_by_storeid for prev__period
const operations_serviceability_data_2 = {
  prev__period: [{ start_date: "2023-02-15", end_date: "2023-03-18" }],
  serviceability_by_storeid_prev: [
    {
      listing_id: "P0011",
      name: "Rockos Bar & Grill-Cheesesteak Daddy",
      total_rate: 3900,
      total_count: 40,
      avg_rate: 97.5,
    },
    {
      listing_id: "P0012",
      name: "Rockos Bar & Grill-Pop s Meatball Sandwich",
      total_rate: 3495.26,
      total_count: 35,
      avg_rate: 99.86,
    },
    {
      listing_id: "P0013",
      name: "Rockos Bar & Grill-Cheeky Bird",
      total_rate: 3600,
      total_count: 36,
      avg_rate: 100,
    },
    {
      listing_id: "P0021",
      name: "Bigtime Market-Cheesesteak Daddy",
      total_rate: 4115,
      total_count: 44,
      avg_rate: 93.52,
    },
    {
      listing_id: "P0022",
      name: "Bigtime Market-Pop s Meatball Sandwich",
      total_rate: 2815,
      total_count: 32,
      avg_rate: 87.97,
    },
    {
      listing_id: "P0023",
      name: "Bigtime Market-Cheeky Bird",
      total_rate: 3098,
      total_count: 34,
      avg_rate: 91.12,
    },
    {
      listing_id: "P0031",
      name: "Overtyme Bar & Grill-Cheesesteak Daddy",
      total_rate: 4000,
      total_count: 42,
      avg_rate: 95.24,
    },
    {
      listing_id: "P0032",
      name: "Overtyme Bar & Grill-Pop s Meatball Sandwich",
      total_rate: 3600,
      total_count: 37,
      avg_rate: 97.3,
    },
    {
      listing_id: "P0041",
      name: "Southgate Grill-Cheesesteak Daddy",
      total_rate: 4957.52,
      total_count: 51,
      avg_rate: 97.21,
    },
    {
      listing_id: "P0042",
      name: "Southgate Grill-Pop s Meatball Sandwich",
      total_rate: 3862,
      total_count: 39,
      avg_rate: 99.03,
    },
    {
      listing_id: "P0043",
      name: "Southgate Grill-Cheeky Bird",
      total_rate: 3862,
      total_count: 39,
      avg_rate: 99.03,
    },
    {
      listing_id: "P0051",
      name: "Leos Coney Island-Dearborn-Cheesesteak Daddy",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0052",
      name: "Leos Coney Island-Dearborn-Pop s Meatball Sandwich",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0053",
      name: "Leos Coney Island-Dearborn-Cheeky Bird",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0061",
      name: "Good Vibes Lounge-Cheesesteak Daddy",
      total_rate: 4774.39,
      total_count: 50,
      avg_rate: 95.49,
    },
    {
      listing_id: "P0062",
      name: "Good Vibes Lounge-Pop s Meatball Sandwich",
      total_rate: 3281.56,
      total_count: 34,
      avg_rate: 96.52,
    },
    {
      listing_id: "P0071",
      name: "Johnnys On The Lake -Cheesesteak Daddy",
      total_rate: 4304.53,
      total_count: 45,
      avg_rate: 95.66,
    },
    {
      listing_id: "P0072",
      name: "Johnnys On The Lake -Pop s Meatball Sandwich",
      total_rate: 3705.36,
      total_count: 38,
      avg_rate: 97.51,
    },
    {
      listing_id: "P0081",
      name: "Leos Coney Island-West Bloomfield-Cheesesteak Daddy",
      total_rate: 3954,
      total_count: 41,
      avg_rate: 96.44,
    },
    {
      listing_id: "P0082",
      name: "Leos Coney Island-West Bloomfield-Pop s Meatball Sandwich",
      total_rate: 3154,
      total_count: 32,
      avg_rate: 98.56,
    },
    {
      listing_id: "P0083",
      name: "Leos Coney Island-West Bloomfield-Cheeky Bird",
      total_rate: 4054,
      total_count: 43,
      avg_rate: 94.28,
    },
    {
      listing_id: "P0091",
      name: "Fifth Avenue-Cheesesteak Daddy",
      total_rate: 3996,
      total_count: 43,
      avg_rate: 92.93,
    },
    {
      listing_id: "P0092",
      name: "Fifth Avenue-Pop s Meatball Sandwich",
      total_rate: 2896,
      total_count: 32,
      avg_rate: 90.5,
    },
    {
      listing_id: "P0101",
      name: "Detroit Grille House-Cheesesteak Daddy",
      total_rate: 4717.86,
      total_count: 53,
      avg_rate: 89.02,
    },
    {
      listing_id: "P0102",
      name: "Detroit Grille House-Pop s Meatball Sandwich",
      total_rate: 3518.83,
      total_count: 38,
      avg_rate: 92.6,
    },
    {
      listing_id: "P0111",
      name: "Gator Jakes Bar & Grill-Cheesesteak Daddy",
      total_rate: 4614,
      total_count: 50,
      avg_rate: 92.28,
    },
    {
      listing_id: "P0112",
      name: "Gator Jakes Bar & Grill-Pop s Meatball Sandwich",
      total_rate: 3114,
      total_count: 33,
      avg_rate: 94.36,
    },
    {
      listing_id: "P0113",
      name: "Gator Jakes Bar & Grill-Cheeky Bird",
      total_rate: 3414,
      total_count: 36,
      avg_rate: 94.83,
    },
    {
      listing_id: "P0121",
      name: "CK Diggs-Cheesesteak Daddy",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0122",
      name: "CK Diggs-Pop s Meatball Sandwich",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0131",
      name: "The Beach Tiki Bar-Cheesesteak Daddy",
      total_rate: 3526.33,
      total_count: 36,
      avg_rate: 97.95,
    },
    {
      listing_id: "P0132",
      name: "The Beach Tiki Bar-Pop s Meatball Sandwich",
      total_rate: 3129.5,
      total_count: 33,
      avg_rate: 94.83,
    },
    {
      listing_id: "P0141",
      name: "US 12 Bar and Grill-Cheesesteak Daddy",
      total_rate: 3684,
      total_count: 38,
      avg_rate: 96.95,
    },
    {
      listing_id: "P0142",
      name: "US 12 Bar and Grill-Pop s Meatball Sandwich",
      total_rate: 3000,
      total_count: 31,
      avg_rate: 96.77,
    },
    {
      listing_id: "P0143",
      name: "US 12 Bar and Grill-Cheeky Bird",
      total_rate: 3100,
      total_count: 31,
      avg_rate: 100,
    },
    {
      listing_id: "P0151",
      name: "Leos Coney Island-Ann Arbor-Cheesesteak Daddy",
      total_rate: 4462.71,
      total_count: 46,
      avg_rate: 97.02,
    },
    {
      listing_id: "P0152",
      name: "Leos Coney Island-Ann Arbor-Pop s Meatball Sandwich",
      total_rate: 3567,
      total_count: 36,
      avg_rate: 99.08,
    },
    {
      listing_id: "P0153",
      name: "Leos Coney Island-Ann Arbor-Cheeky Bird",
      total_rate: 4367,
      total_count: 45,
      avg_rate: 97.04,
    },
    {
      listing_id: "P0161",
      name: "Leo s Coney Island - Clio-Bedhead Burritos and Bowls",
      total_rate: 4585,
      total_count: 46,
      avg_rate: 99.67,
    },
    {
      listing_id: "P0162",
      name: "Leo s Coney Island - Clio-Cheeky Bird",
      total_rate: 3585,
      total_count: 37,
      avg_rate: 96.89,
    },
    {
      listing_id: "P0163",
      name: "Leo s Coney Island - Clio-House of Parm",
      total_rate: 4576.56,
      total_count: 48,
      avg_rate: 95.34,
    },
    {
      listing_id: "P0164",
      name: "Leo s Coney Island - Clio-Pop s Meatball Sandwich",
      total_rate: 2985,
      total_count: 30,
      avg_rate: 99.5,
    },
    {
      listing_id: "P0171",
      name: "8 Mile Grill & Restaurant-Cheeky Bird",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0172",
      name: "8 Mile Grill & Restaurant-Cheesesteak Daddy",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0173",
      name: "8 Mile Grill & Restaurant-Pop s Meatball Sandwich",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0181",
      name: "Red Olive Restaurant - Ferndale-Bedhead Burritos and Bowls",
      total_rate: 5196.83,
      total_count: 54,
      avg_rate: 96.24,
    },
    {
      listing_id: "P0182",
      name: "Red Olive Restaurant - Ferndale-House of Parm",
      total_rate: 4695.08,
      total_count: 48,
      avg_rate: 97.81,
    },
    {
      listing_id: "P0183",
      name: "Red Olive Restaurant - Ferndale-Pop s Meatball Sandwich",
      total_rate: 3500,
      total_count: 36,
      avg_rate: 97.22,
    },
    {
      listing_id: "P0191",
      name: "White Horse Tavern-Cheeky Bird",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0192",
      name: "White Horse Tavern-Cheesesteak Daddy",
      total_rate: 2600,
      total_count: 27,
      avg_rate: 96.3,
    },
    {
      listing_id: "P0201",
      name: "Leo s Coney Island - Miller Rd-Bedhead Burritos and Bowls",
      total_rate: 5062,
      total_count: 52,
      avg_rate: 97.35,
    },
    {
      listing_id: "P0202",
      name: "Leo s Coney Island - Miller Rd-House of Parm",
      total_rate: 4562,
      total_count: 47,
      avg_rate: 97.06,
    },
    {
      listing_id: "P0203",
      name: "Leo s Coney Island - Miller Rd-Pop s Meatball Sandwich",
      total_rate: 3360.87,
      total_count: 34,
      avg_rate: 98.85,
    },
    {
      listing_id: "P0211",
      name: "Lucky s Hole In The Wall Sports Bar-Cheeky Bird",
      total_rate: 2600,
      total_count: 27,
      avg_rate: 96.3,
    },
    {
      listing_id: "P0212",
      name: "Lucky s Hole In The Wall Sports Bar-Cheesesteak Daddy",
      total_rate: 2600,
      total_count: 27,
      avg_rate: 96.3,
    },
    {
      listing_id: "P0213",
      name: "Lucky s Hole In The Wall Sports Bar-Pop s Meatball Sandwich",
      total_rate: 2600,
      total_count: 27,
      avg_rate: 96.3,
    },
    {
      listing_id: "P0221",
      name: "Athena s Diner-Bedhead Burritos and Bowls",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0222",
      name: "Athena s Diner-House of Parm",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0223",
      name: "Athena s Diner-Pop s Meatball Sandwich",
      total_rate: 2700,
      total_count: 27,
      avg_rate: 100,
    },
    {
      listing_id: "P0231",
      name: "Cameo Restaurant-Bedhead Burritos and Bowls",
      total_rate: 4331.79,
      total_count: 45,
      avg_rate: 96.26,
    },
    {
      listing_id: "P0232",
      name: "Cameo Restaurant-House of Parm",
      total_rate: 4209,
      total_count: 45,
      avg_rate: 93.53,
    },
    {
      listing_id: "P0233",
      name: "Cameo Restaurant-Pop s Meatball Sandwich",
      total_rate: 3220.17,
      total_count: 34,
      avg_rate: 94.71,
    },
    {
      listing_id: "P0241",
      name: "Classic Lanes-Cheeky Bird",
      total_rate: 3774,
      total_count: 38,
      avg_rate: 99.32,
    },
    {
      listing_id: "P0242",
      name: "Classic Lanes-Cheesesteak Daddy",
      total_rate: 4668.94,
      total_count: 47,
      avg_rate: 99.34,
    },
    {
      listing_id: "P0251",
      name: "Orange Tree Cafe Restaurant-Bedhead Burritos and Bowls",
      total_rate: 4516.03,
      total_count: 47,
      avg_rate: 96.09,
    },
    {
      listing_id: "P0252",
      name: "Orange Tree Cafe Restaurant-House of Parm",
      total_rate: 4338,
      total_count: 46,
      avg_rate: 94.3,
    },
    {
      listing_id: "P0253",
      name: "Orange Tree Cafe Restaurant-Pop s Meatball Sandwich",
      total_rate: 3529.93,
      total_count: 37,
      avg_rate: 95.4,
    },
    {
      listing_id: "P0261",
      name: "Leo s Coney Island - Ypsilanti-Bedhead Burritos and Bowls",
      total_rate: 2041.45,
      total_count: 30,
      avg_rate: 68.05,
    },
    {
      listing_id: "P0262",
      name: "Leo s Coney Island - Ypsilanti-House of Parm",
      total_rate: 2082,
      total_count: 30,
      avg_rate: 69.4,
    },
    {
      listing_id: "P0263",
      name: "Leo s Coney Island - Ypsilanti-Pop s Meatball Sandwich",
      total_rate: 1782,
      total_count: 27,
      avg_rate: 66,
    },
    {
      listing_id: "P0271",
      name: "Red Olive Restaurant - Michigan-Bedhead Burritos and Bowls",
      total_rate: 5297.22,
      total_count: 55,
      avg_rate: 96.31,
    },
    {
      listing_id: "P0272",
      name: "Red Olive Restaurant - Michigan-House of Parm",
      total_rate: 4895.69,
      total_count: 51,
      avg_rate: 95.99,
    },
    {
      listing_id: "P0273",
      name: "Red Olive Restaurant - Michigan-Pop s Meatball Sandwich",
      total_rate: 3700,
      total_count: 38,
      avg_rate: 97.37,
    },
    {
      listing_id: "P0292",
      name: "River Diner-Bedhead Burritos and Bowls",
      total_rate: 1200,
      total_count: 12,
      avg_rate: 100,
    },
    {
      listing_id: "P0293",
      name: "River Diner-Pop s Meatball Sandwich",
      total_rate: 564.36,
      total_count: 6,
      avg_rate: 94.06,
    },
    {
      listing_id: "P0291",
      name: "River Diner-House of Parm",
      total_rate: 893.46,
      total_count: 9,
      avg_rate: 99.27,
    },
    {
      listing_id: "P0301",
      name: "Moe s Place-Cheesesteak Daddy",
      total_rate: 100,
      total_count: 1,
      avg_rate: 100,
    },
    {
      listing_id: "P0302",
      name: "Moe s Place-Pop s Meatball Sandwich",
      total_rate: 100,
      total_count: 1,
      avg_rate: 100,
    },
    {
      listing_id: "P0303",
      name: "Moe s Place-Cheeky Bird",
      total_rate: 100,
      total_count: 1,
      avg_rate: 100,
    },
  ],
};

const operations_serviceability_platform_wise = {
  platform_wise_online_rate: {
    DOORDASH: {
      channel: "DOORDASH",
      total_online_rate: 41437.22,
      total_online_count: 438,
      avg_online_rate: 94.61,
      prev_total_online_rate: 62212.23,
      prev_total_online_count: 669,
      prev_avg_online_rate: 92.99,
      percentage_difference: 1.73,
    },
    UBEREATS: {
      channel: "UBEREATS",
      total_online_rate: 211667,
      total_online_count: 2249,
      avg_online_rate: 94.12,
      prev_total_online_rate: 212572,
      prev_total_online_count: 2201,
      prev_avg_online_rate: 96.58,
      percentage_difference: -2.55,
    },
    GRUBHUB: {
      channel: "GRUBHUB",
      total_online_rate: 0,
      total_online_count: 0,
      avg_online_rate: 0,
      prev_total_online_rate: 0,
      prev_total_online_count: 0,
      prev_avg_online_rate: 0,
      percentage_difference: 0,
    },
  },
  platform_wise_online_rate_prev: {
    DOORDASH: {
      channel: "DOORDASH",
      total_online_rate: 62212.23,
      total_online_count: 669,
      avg_online_rate: 92.99,
    },
    UBEREATS: {
      channel: "UBEREATS",
      total_online_rate: 212572,
      total_online_count: 2201,
      avg_online_rate: 96.58,
    },
    GRUBHUB: {
      channel: "GRUBHUB",
      total_online_rate: 0,
      total_online_count: 0,
      avg_online_rate: 0,
    },
  },
};

// Todo:
const PROMPT_OPERATIONS_ONE = `Provide a statistical analysis for the serviceability of all the restaurants(this is current period data), based on the provided data, give some recommendations for the restaurants that are not serviceable, please provide a comparison between the two periods. try to compress this data so that i can pass this in the next prompt and have sufficient data to work with it, give thr response in 30 words or less.`;
const PROMPT_OPERATIONS_TWO = `Provide a statistical analysis for the serviceability of all the restaurants(this is previous period data), based on the provided data, give some recommendations for the restaurants that are not serviceable, please provide a comparison between the two periods. try to compress this data so that i can pass this in the next prompt and have sufficient data to work with it, give thr response in 30 words or less.`;

// const PROMPT_OPERATIONS = `Provide a statistical analysis for the serviceability of all the restaurants(this is current period data), based on the provided data, give some recommendations for the restaurants that are not serviceable we also have prev period data for the same, please provide a comparison between the two periods. The response should be of 30 words or less.`;

// const PROMPT_OPERATIONS = `Provide a statistical analysis for the serviceability of all the restaurants, based on the provided data, give some recommendations for the restaurants that are not serviceable we also have prev period data for the same, please provide a comparison between the two periods. The response should be of 30 words or less. Please provide the response in the following format: Listing ID, Name, Total Rate, Total Count, Average Rate, Prev Period Total Rate, Prev Period Total Count, Prev Period Average Rate, Difference in Total Rate, Difference in Total Count, Difference in Average Rate

const PROMPT_OPERATIONS_PLATFORM = `Provide a statistical analysis for the serviceability of all the restaurants, here you have platform wise data for the current period, based on the provided data, give some recommendations for the restaurants that are not serviceable we also have prev period data for the same, please provide a comparison between the two periods. The response should be of 30 words or less.
`;

// -----------------------------------------------------------

module.exports = {
  getOperationStoreWiseInsights: async (payload) => {
    const { stores_serviceability } = payload || {};

    const data = await getOpenAIResponse(
      stores_serviceability
        ? stores_serviceability
        : operations_serviceability_data_1,
      PROMPT_OPERATIONS_ONE,
      "store wise serviceability"
    );

    if (!data.status) {
      return {
        status: false,
        error: data.error,
      };
    }
    return {
      status: true,
      data: data.response,
    };
  },
  getOperationPlatformWiseInsights: async (payload) => {
    const { serviceability_platform_wise } = payload || {};

    const platform_data = await getOpenAIResponse(
      serviceability_platform_wise
        ? serviceability_platform_wise
        : operations_serviceability_platform_wise,
      PROMPT_OPERATIONS_PLATFORM,
      "serviceability platform wise"
    );

    if (!platform_data.status) {
      return {
        status: false,
        error: platform_data.error,
      };
    }
    return {
      status: true,
      data: platform_data.response,
    };
  },
};
