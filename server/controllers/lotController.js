const Lot = require("../models/Lot");

exports.getAllLots = async (req, res) => {
  try {
    const lots = await Lot.find();
    res.json(lots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lots" });
  }
};
