const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connection = require("./db/config");
const saveData = require("./routes/saveData");
const payment = require("./routes/payment");
const user = require("./routes/user");
const SaveDetailsModel = require("./models/saveData");
const cors = require("cors");
connection();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token");
  next();
});

app.use(
  cors({
    origin: [
      `${process.env.USER_FRONTEND_URL}`,
      ,
      `${process.env.ADMIN_FRONTEND_URL}`,
    ],
    methods: ["GET", "POST"],

    credentials: true,
  })
);
app.use(express.json());
app.use("/files", express.static("files"));

app.use("/api/v1/details", saveData);
app.use("/api/v1/payment", payment);
app.use("/api/v1/user", user);

const server = require("http").createServer(app);

const io = require("./util/socket").init(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join_room", async (room) => {
    socket.join(room.shopId);

    const orders = await SaveDetailsModel.find({
      shopId: room.shopId,
    });

    io.to(room.shopId).emit("receiveOrders", {orders});
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
