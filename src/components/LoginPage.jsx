/* eslint-disable react/prop-types */

import { CircleUser, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import image from "/src/assets/blue-brush-stroke-banner.jpg";
import axios from "axios";

const LoginPage = ({ onSuccessfulLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsTyping(e.target.value !== "");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Gọi API đăng nhập
    const response = await axios.post("https://apikde.vercel.app/api/login", {
      email: username,
      password,
    });

    if (response.data?.message) setErrorMessage('Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại!');
    else {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", response.data.id);
      onSuccessfulLogin();
    }
  };

  return (
    <div className="login-container w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2 h-half md:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col"></div>
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover shadow-2xl"
        />
      </div>
      <div className="w-full md:w-1/2 h-half md:h-full bg-[#f5f5f5] flex flex-col p-4 md:p-20 justify-between">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-4xl font-semibold mb-2">Login</h3>
            <p className="text-sm mb-2">
              Welcome Back! Please enter your details
            </p>
          </div>
          <form action="" onSubmit={handleLogin}>
            <div className="w-full flex flex-col">
              <div>
                <div className="relative my-4">
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                    placeholder="Email"
                    required
                  />
                  <CircleUser className="absolute top-7 right-4" />
                </div>
                <div className="relative my-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                    placeholder="Password"
                    required
                  />
                  {isTyping && (
                    <Eye
                      className="absolute top-7 right-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full h-12 text-white my-2 bg-[#013CC6] border-2 border-white rounded-full p-1 text-center flex items-center justify-center hover:bg-white hover:text-[#013CC6] transition-all hover:border-2 hover:border-[#013CC6]"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              {errorMessage && (
                <p className="text-[#be2f2f] text-lg m-4">{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Dont have an account?{" "}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              <Link to={"/register"}>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
