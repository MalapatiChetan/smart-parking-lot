import React, { useEffect, useState } from "react";
import API from "../api";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?"))
      return;
    try {
      await API.delete(`/reservations/${id}`);
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (err) {
      console.error("Failed to delete reservation:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="admin-panel">
      <h2 className="admin-title">🛠️ Admin Panel - Reservations</h2>

      {loading ? (
        <p>Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((res) => (
            <div key={res._id} className="reservation-card">
              <p>
                <strong>User:</strong> {res.username}
              </p>
              <p>
                <strong>Email:</strong> {res.email}
              </p>
              <p>
                <strong>License:</strong> {res.license}
              </p>
              <p>
                <strong>Lot:</strong> {res.lotId?.name || res.lotId}
              </p>
              <p>
                <strong>Slot:</strong> #{res.slotId?.number || res.slotId}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(res.timestamp).toLocaleString()}
              </p>
              <button
                className="delete-btn"
                onClick={() => deleteReservation(res._id)}
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
