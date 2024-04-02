import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genders, setGenders] = useState("");
  const [genderOptions, setGenderOptions] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      fullName: fullName,
      password: password,
      confirmPassword: confirmPassword,
      genders: genders,
    };

    // Call API to submit form data
    fetch("https://apikde.vercel.app/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response
        console.log("Form data submitted successfully:", data);
        closeModal();
      })
      .catch((error) => {
        // Handle error response
        console.error("Error submitting form data: ", error);
      });

    // Clear form fields
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setGenders("");
  };

  const handleAddUser = () => {
    openModal();
  };
  return (
    <div className="w-full flex justify-between my-8">
      <h2 className="font-bold text-3xl mb-4 text-[#013CC6]">PROFILE</h2>

      <Button
        className=" py-4 px-6 mt-4"
        onClick={handleAddUser}
        variant="secondary"
      >
        ADD PROFILE
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal bg-white p-4 rounded-md w-1/3">
            <h3 className="text-3xl  font-bold mb-4 ">Thêm người dùng</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="flex items-center mb-4">
                <label htmlFor="email" className="text-black mr-2 w-24">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email..."
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="fullname" className="text-black mr-2 w-24">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name..."
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="password" className="text-black mr-2 w-24">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..."
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="confirm-password"
                  className="text-black mr-2 w-24"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password..."
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="genders" className="text-black mr-2 w-24">
                  Genders
                </label>
                <select
                  id="genders"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  value={genders}
                  onChange={(e) => setGenders(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  {genderOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-md px-4 py-2"
                >
                  Remove
                </button>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-black rounded-md px-4 py-2 ml-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
