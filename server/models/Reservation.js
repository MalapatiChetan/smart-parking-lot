const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  license: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("Reservation", reservationSchema);
