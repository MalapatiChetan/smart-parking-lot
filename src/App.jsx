import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MapView from "./components/MapView";
import SlotSelector from "./components/SlotSelector";
import ReservationForm from "./components/ReservationForm";
import Confirmation from "./components/Confirmation";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/slots/:lotId" element={<SlotSelector />} />
        <Route path="/reserve" element={<ReservationForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
