//  create a express server

const express = require("express");
const {data} = require('./temp_data')
const app = express();

const port = 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "all reviews from the database",
    data: data,
  });
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    }
);
