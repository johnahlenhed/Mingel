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
import Lobby from "./pages/Lobby.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Clear user data in development mode for testing purposes
if (import.meta.env.DEV) {
    localStorage.removeItem('user')
  }

function App() {
  return (
    <Router>
      <Routes>
        {/* Always accessible routes */}
        <Route path="/register" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/lobby" element={<Lobby />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/connections" element={<ProtectedRoute><DynamicBG><Connections /></DynamicBG></ProtectedRoute>} />
        <Route path="/contacts/:id" element={<ProtectedRoute><DynamicBG><Contacts /></DynamicBG></ProtectedRoute>} />
        <Route path="/company1" element={<ProtectedRoute><CompanyHome /></ProtectedRoute>} />
        <Route path="/company2" element={<ProtectedRoute><DynamicBG><CompanyConnections /></DynamicBG></ProtectedRoute>} />
        <Route path="/company-contacts/:id" element={<ProtectedRoute><CompanyContacts /></ProtectedRoute>} />
        
        {/* <Route path="/contacts" element={<Contacts />} /> */}
        
      </Routes>
    </Router>
  );
}
export default App;
