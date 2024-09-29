const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  devices: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Device", deviceSchema);
