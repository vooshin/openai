require("dotenv").config();
const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const app = express();
const PORT = process.env.PORT || 5051;
const BASE_ENDPOINT = `http://localhost:${PORT}`;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const routes = require("./routes/index");
app.use("/", routes);
app.set("view engine", "ejs"); // set the view engine to ejs
const allEndPoints = listEndpoints(app);
const endPoints = allEndPoints.map((endPoint) => {
  return `method: ${endPoint.methods[0]} path: ${BASE_ENDPOINT}${endPoint.path}`;
});
console.table(endPoints);

//  listing all the endpoints
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
