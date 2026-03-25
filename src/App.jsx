import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterLandingPage from "./pages/RegisterLandingPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import Landingpage from "./pages/Home.jsx";
import Connections from "./pages/Connections.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/landingRegister" element={<RegisterLandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
export default App;
