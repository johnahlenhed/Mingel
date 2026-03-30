import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import "./App.css";
import Home from "./pages/Home.jsx";
import Connections from "./pages/Connections.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/register" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
export default App;
