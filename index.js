const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connection = require("./db/config");
const saveData = require("./routes/saveData");
const payment = require("./routes/payment");
const SaveDetailsModel = require("./models/saveData");
const cors = require("cors");
connection();
app.use(
  cors({
    origin: ["http://localhost:3000", , "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/files", express.static("files"));

app.use("/api/v1/details", saveData);
app.use("/api/v1/payment", payment);

const server = require("http").createServer(app);

const io = require("./util/socket").init(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("getData", async (data) => {
    try {
      const orders = await SaveDetailsModel.find({ userId: data.userId });

      socket.emit("receiveData", {
        orders,
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server running at ${PORT}`);
  }
});
