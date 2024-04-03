import { Bell, Search, CircleUser, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  let menuRef = useRef();
  const userId = localStorage.getItem("userId");

  function proi() {
    return axios

      .get(`https://apikde.vercel.app/api/profile/${userId}`)
      .then((response) => {
        console.log(response.data.profile);

        return response.data.profile;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  proi().then((tt) => {
    console.log(tt);
    setUserData(tt);
  });
  const [userData, setUserData] = useState({});
  console.log(userData);

  const handleLogout = () => {
    // Xóa dữ liệu người dùng khỏi lưu trữ cục bộ
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    // Tùy chọn, gửi yêu cầu đăng xuất đến backend (nếu có)
    // fetch('/api/logout')
    //   .then(() => {
    //     // Xử lý đăng xuất thành công trên phía máy chủ
    //   })
    //   .catch((error) => {
    //     console.error('Lỗi khi đăng xuất:', error);
    //   });

    // Chuyển hướng đến trang đăng nhập
    window.location.href = "/login"; // Thay thế bằng URL trang đăng nhập của bạn
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="h-20 w-full  flex  justify-between ">
      <div className="h-10 w-3/5 my-5 bg-white  rounded-md flex relative items-center text-gray-400">
        <input
          type="text"
          id="email-input"
          className="px-12 w-full h-full  rounded-md focus:outline-none"
          placeholder="Search"
        />

        <Search className=" absolute ml-3  cursor-pointer" />
      </div>

      <div className="flex-wrap mr-10"></div>

      <div className=" w-24 mt-5 flex justify-between ">
        <div className="bg-white h-10 w-10  rounded-md flex relative items-center ">
          <Bell className="mb-2.5  absolute  ml-2 mt-2" />
        </div>

        <div ref={menuRef} className="relative">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <img
              className="h-10 w-10  rounded-md"
              src="https://img.freepik.com/premium-photo/cartoon-game-avatar-logo-gaming-brand_902820-467.jpg"
              alt=""
            />
          </button>

          {isOpen && (
            <div
              // ref={menuRef}
              className="bg-white absolute  py-1 right-0   w-36   "
            >
              <div className="">
                <a
                  href="#"
                  className=" text-blue-700 px-4 py-2 hover:bg-gray-100 flex justify-between "
                >
                  Profile
                  <CircleUser />
                </a>
              </div>
              <a
                onClick={handleLogout}
                className="text-blue-700 px-4 py-2 hover:bg-gray-100  flex justify-between"
              >
                Log out
                <LogOut />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
