require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5051;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/index");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
