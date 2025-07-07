const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Create a reservation
router.post("/", reservationController.createReservation);

// View all reservations (admin)
router.get("/", reservationController.getAllReservations);

// Delete a reservation (admin)
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
