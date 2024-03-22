import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import AdminManagement from "./components/AdminManagement";
import Settings from "./components/Settings";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#E5E5E5] w-screen h-screen flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/admin-management" element={<AdminManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
