const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connection = require("./db/config");
const saveData = require("./routes/saveData");
const payment = require("./routes/payment");
const path = require("path");
const cors = require("cors");
connection();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));
app.use("/", express.static(path.join(__dirname, "public/build")));

app.use("/api/v1/details", saveData);
app.use("/api/v1/payment", payment);

app.get("/", (req, res) => {
  res.sendFile(express.static(path.join(__dirname, "public/build/index.html")));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server running at ${PORT}`);
  }
});
