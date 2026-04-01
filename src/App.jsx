import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import "./App.css";
import Home from "./pages/Home.jsx";
import Connections from "./pages/Connections.jsx";
import Contacts from "./pages/Contacts.jsx";
import CompanyHome from "./pages/CompanyHome.jsx";
import CompanyConnections from "./pages/CompanyConnections.jsx";
import CompanyContacts from "./pages/CompanyContacts.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connections" element={<Connections />} />
        {/* <Route path="/contacts" element={<Contacts />} /> */}
        <Route path="/contacts/:id" element={<Contacts />} />
        <Route path="/register" element={<LandingPage />} />

        <Route path="/company1" element={<CompanyHome />} />
        <Route path="/company2" element={<CompanyConnections />} />
        <Route path="/company-contacts/:id" element={<CompanyContacts />} />
      </Routes>
    </Router>
  );
}
export default App;
