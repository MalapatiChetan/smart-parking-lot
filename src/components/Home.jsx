import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container text-center mt-5">
      <h1 className="mb-4">Smart Parking Lot</h1>
      <p className="lead mb-4">
        Reserve your spot in seconds — skip the parking chaos!
      </p>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/map")}
      >
        Start Booking
      </button>
      <footer className="mt-5 text-muted">Developed by Chetan Malapati</footer>
    </div>
  );
};

export default Home;
