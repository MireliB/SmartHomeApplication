const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", //the frontend URL
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// DB connection
mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const jwtSecret = process.env.JWT_SECRET || "secret"; // Make sure JWT_SECRET is defined in your .env

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// schema for room devices, includes name, status, room and user
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Models
const User = mongoose.model("User", userSchema);
const Room = mongoose.model("Room", roomSchema);
const Device = mongoose.model("Device", deviceSchema);

// Routes
app.post("/signUp", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  console.log("Received login request with body:", req.body); // Logging the request body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "8h" });
    res.json({ token });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access denied" });

  const token = authHeader.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

app.post("/room", authenticate, async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;
  try {
    const newRoom = new Room({ name, user: userId });
    await newRoom.save();
    res.json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/rooms", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const rooms = await Room.find({ user: userId }).populate("devices");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/room/:id", authenticate, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("devices");
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/room/:id", authenticate, async (req, res) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Room updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/room/:id", authenticate, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/device", authenticate, async (req, res) => {
  const { name, status, room } = req.body;
  const userId = req.userId;

  try {
    const newDevice = new Device({ name, status, room, user: userId });
    await newDevice.save();

    const associatedRoom = await Room.findById(room);
    associatedRoom.devices.push(newDevice._id);
    await associatedRoom.save();

    res.json(newDevice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/devices", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const devices = await Device.find({ user: userId });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/device/:id", authenticate, async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/device/:id", authenticate, async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDevice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/device/:id", authenticate, async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: "Device deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
