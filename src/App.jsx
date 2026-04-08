import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import "./App.css";
import DynamicBG from "./components/DynamicBG.jsx";
import Home from "./pages/Home.jsx";
import Connections from "./pages/Connections.jsx";
import Contacts from "./pages/Contacts.jsx";
import CompanyHome from "./pages/CompanyHome.jsx";
import CompanyConnections from "./pages/CompanyConnections.jsx";
import CompanyContacts from "./pages/CompanyContacts.jsx";
import Login from "./pages/Login.jsx";
import Puzzle from "./pages/Puzzle.jsx";
import Admin from "./admin/Admin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/connections"
          element={
            <DynamicBG>
              <Connections />
            </DynamicBG>
          }
        />
        {/* <Route path="/contacts" element={<Contacts />} /> */}
        <Route
          path="/contacts/:id"
          element={
            <DynamicBG>
              <Contacts />
            </DynamicBG>
          }
        />
        <Route path="/register" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/company1" element={<CompanyHome />} />
        <Route
          path="/company2"
          element={
            <DynamicBG>
              <CompanyConnections />
            </DynamicBG>
          }
        />
        <Route
          path="/company-contacts/:id"
          element={
            <DynamicBG>
              <CompanyContacts />
            </DynamicBG>
          }
        />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;
