import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./MapView.css";

// Red marker icon
const redIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = () => {
  const [lots, setLots] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  // Load all lots on component mount
  useEffect(() => {
    API.get("/lots")
      .then((res) => setLots(res.data))
      .catch((err) => console.error("Failed to load lots:", err));
  }, []);

  // When user clicks a lot marker on map
  const handleMarkerClick = (lot) => {
    setSelectedLot(lot);
    API.get(`/slots/${lot._id}`)
      .then((res) => setSlots(res.data))
      .catch((err) => {
        console.error("Failed to load slots for lot:", lot._id, err);
        setSlots([]);
      });
  };

  return (
    <div className="map-layout">
      {/* Left: Map */}
      <div className="map-section">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={14}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {lots.map((lot) => (
            <Marker
              key={lot._id}
              position={[lot.location.lat, lot.location.lng]}
              icon={redIcon}
              eventHandlers={{
                click: () => handleMarkerClick(lot),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Right: Slot list */}
      <div className="slot-section">
        <h5 className="mt-3 text-center">
          {selectedLot ? `Slots in ${selectedLot.name}` : "Select a lot"}
        </h5>
        <div className="slot-list">
          {slots.length === 0 && selectedLot && (
            <p className="text-center">No slots found for this lot.</p>
          )}
          {slots.map((slot) => (
            <div
              key={slot._id}
              className={`slot-card ${slot.status}`}
              onClick={() => {
                if (slot.status === "available") {
                  navigate("/reserve", {
                    state: {
                      lotId: selectedLot._id,
                      lotName: selectedLot.name,
                      slot,
                    },
                  });
                }
              }}
              style={{
                cursor: slot.status === "available" ? "pointer" : "not-allowed",
              }}
            >
              Slot #{slot.number} - {slot.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
