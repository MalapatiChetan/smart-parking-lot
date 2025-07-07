const Reservation = require("../models/Reservation");
const Slot = require("../models/Slot");
const nodemailer = require("nodemailer");

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.createReservation = async (req, res) => {
  console.log("Request body:", req.body);

  const { lotId, slotId, username, email, license, timestamp } = req.body;

  try {
    // Mark slot as booked
    await Slot.findByIdAndUpdate(slotId, { status: "booked" });

    // Save reservation
    const newReservation = new Reservation({
      lotId,
      slotId,
      username,
      email,
      license,
      timestamp,
    });

    await newReservation.save();

    // Send confirmation email
    const mailOptions = {
      from: `"Smart Parking" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Parking Slot Reserved Successfully",
      html: `
    <h2>Hello ${username},</h2>
    <p>Your slot at <b>${lotId}</b> (Slot #${slotId}) has been reserved successfully.</p>
    <p><b>Time:</b> ${new Date(timestamp).toLocaleString()}</p>
    <p>Thank you for using Smart Parking!</p>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Failed to send email:", error);
      } else {
        console.log("📧 Email sent:", info.response);
      }
    });

    res.status(201).json({
      message: "Reservation successful",
      reservation: newReservation,
    });
  } catch (err) {
    console.error("Reservation Error:", err);
    res.status(500).json({
      error: "Failed to create reservation",
      details: err.message,
    });
  }
};

// Admin: View all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("lotId slotId");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// Admin: Delete reservation and notify user
exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await Reservation.findByIdAndDelete(reservationId);
    if (reservation) {
      await Slot.findByIdAndUpdate(reservation.slotId, { status: "available" });

      // Send cancellation email
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: reservation.email,
        subject: "🚫 Parking Slot Reservation Cancelled",
        html: `
          <h3>Hi ${reservation.username},</h3>
          <p>Your parking reservation has been <strong>cancelled by the admin</strong>.</p>
          <ul>
            <li><strong>Slot ID:</strong> ${reservation.slotId}</li>
            <li><strong>License:</strong> ${reservation.license}</li>
            <li><strong>Original Time:</strong> ${new Date(
              reservation.timestamp
            ).toLocaleString()}</li>
          </ul>
          <p>If you have any questions, please contact support.</p>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("Cancel email failed:", err);
        else console.log("Cancellation email sent:", info.response);
      });

      res.json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
};
