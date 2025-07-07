const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
  number: { type: String, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
});

module.exports = mongoose.model("Slot", slotSchema);
