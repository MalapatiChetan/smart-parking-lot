const Slot = require("../models/Slot");

exports.getSlotsByLotId = async (req, res) => {
  const lotId = req.params.lotId;
  try {
    const slots = await Slot.find({ lotId });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch slots" });
  }
};

exports.updateSlotStatus = async (req, res) => {
  const { slotId, status } = req.body;
  try {
    const slot = await Slot.findByIdAndUpdate(
      slotId,
      { status },
      { new: true }
    );
    res.json({ message: "Slot updated", slot });
  } catch (err) {
    res.status(500).json({ error: "Failed to update slot" });
  }
};
