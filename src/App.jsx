import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Role from "./components/Role";
import Permission from "./components/Permission";
import Settings from "./components/Settings";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Luu thong tin dang nhap
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className=" h-full ">
        <Routes>
          {isLoggedIn ? (
            <Route
              path="/*"
              element={
                <div className="bg-[#E5E5E5]  h-full md:w-screen  flex flex-col md:flex-row">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/permission" element={<Permission />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              }
            />
          ) : (
            <>
              <Route
                path="/"
                element={
                  <LoginPage onSuccessfulLogin={handleSuccessfulLogin} />
                }
              />
              <Route path="/*" element={<Navigate to="/" replace />} />
            </>
          )}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
