import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api"; // Make sure API is set to axios.create({ baseURL: "http://localhost:5000/api" })
import "./SlotSelector.css";

const SlotSelector = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [lotName, setLotName] = useState("");

  // Fetch slot data for selected lot from MongoDB
  useEffect(() => {
    API.get(`/slots/${lotId}`)
      .then((res) => {
        setAvailableSlots(res.data);
      })
      .catch((err) => {
        console.error("Failed to load slots:", err);
        setAvailableSlots([]);
      });

    API.get(`/lots`)
      .then((res) => {
        const lot = res.data.find((lot) => lot._id === lotId);
        setLotName(lot ? lot.name : "Selected Lot");
      })
      .catch((err) => {
        console.error("Failed to load lot name:", err);
        setLotName("Selected Lot");
      });
  }, [lotId]);

  const handleSelect = (slot) => {
    navigate("/reserve", { state: { lotId, slot } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select a Slot in {lotName}</h2>
      <div className="slot-grid">
        {availableSlots.map((slot) => (
          <button
            key={slot._id}
            className={`slot-btn ${
              slot.status === "available" ? "available" : "booked"
            }`}
            disabled={slot.status !== "available"}
            onClick={() => handleSelect(slot)}
          >
            Slot #{slot.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotSelector;
