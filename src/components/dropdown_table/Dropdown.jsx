import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';
import { PiDotsThreeOutlineFill } from "react-icons/pi";


function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown}><PiDotsThreeOutlineFill /></button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">1. Thông tin người dùng</a>
          <a href="#">2. Chỉnh sửa người dùng</a>
          <a href="#">3. Phân quyền</a>
          <a href="#">4. Xóa người dùng</a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;