const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const userRoutes = require("./models/User.model");
const Room = require("./models/Room.model");
const Device = require("./models/Device.model");

const initMongo = require("./db/db");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

initMongo();

app.use("/login", userRoutes);
app.use("/signup", userRoutes);
app.use("/room", Room);
app.use("/device", Device);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
