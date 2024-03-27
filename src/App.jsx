import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import AdminManagement from "./components/AdminManagement";
import Settings from "./components/Settings";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {isLoggedIn ? (
            <Route path="/*" element={
              <div className="bg-[#E5E5E5] w-screen h-screen flex">
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/admin-management" element={<AdminManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            }/>
          ) : (
            <>
              <Route path="/login" element={<LoginPage onSuccessfulLogin={handleSuccessfulLogin}/>} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
