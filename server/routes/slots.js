const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");

// Get all slots for a specific lot
router.get("/:lotId", slotController.getSlotsByLotId);

// Update slot status (used during booking or admin actions)
router.put("/update", slotController.updateSlotStatus);

module.exports = router;
