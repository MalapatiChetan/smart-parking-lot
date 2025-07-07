import React from "react";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import "./Confirmation.css";

const Confirmation = () => {
  const { state } = useLocation();

  if (!state) return <p>No reservation details found.</p>;

  const { reservationId, username, email, lotName, slotNumber, timestamp } =
    state;

  const qrValue = `Reservation for ${username} at ${lotName}, Slot #${slotNumber} on ${new Date(
    timestamp
  ).toLocaleString()} (ID: ${reservationId})`;

  return (
    <div className="confirmation-container">
      <h2>🎉 Reservation Confirmed!</h2>
      <p>
        <strong>Name:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Lot:</strong> {lotName}
      </p>
      <p>
        <strong>Slot:</strong> #{slotNumber}
      </p>
      <p>
        <strong>Date & Time:</strong> {new Date(timestamp).toLocaleString()}
      </p>
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Your QR Code:</strong>
        </p>
        <QRCodeSVG value={qrValue} size={180} />
      </div>
    </div>
  );
};

export default Confirmation;
