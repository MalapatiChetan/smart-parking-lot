import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";
import "./ReservationForm.css";

const ReservationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lotId, lotName, slot } = location.state || {};
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    license: "",
    timestamp: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reservationPayload = {
        ...formData,
        lotId,
        slotId: slot._id,
        timestamp: new Date(formData.timestamp),
      };

      const res = await API.post("/reservations", reservationPayload);

      if (res.status === 201) {
        const reservation = res.data.reservation;

        navigate("/confirmation", {
          state: {
            reservationId: reservation._id,
            username: formData.username,
            email: formData.email,
            lotName,
            slotNumber: slot.number,
            timestamp: formData.timestamp,
          },
        });
      }
    } catch (err) {
      console.error("Reservation failed:", err.response?.data || err.message);
      alert("❌ Failed to reserve slot");
    }
  };

  if (!lotId || !slot) {
    return <p className="text-center mt-5">Missing reservation details.</p>;
  }

  return (
    <div className="reservation-form-container">
      <h2 className="text-center mb-4">
        Reserve Parking Slot #{slot.number} in {lotName}
      </h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="example@email.com"
        />

        <label>License Number</label>
        <input
          name="license"
          value={formData.license}
          onChange={handleChange}
          required
          placeholder="DL1234567"
        />

        <label>Date & Time</label>
        <input
          type="datetime-local"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
          required
        />

        <button type="submit">Reserve Slot</button>
      </form>
    </div>
  );
};

export default ReservationForm;
