import { Bell, Search, CircleUser, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  let menuRef = useRef();
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

      <div className=" w-24  mt-5 flex justify-between ">
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
                  className="  block px-4 py-2 hover:bg-gray-100 flex justify-between "
                >
                  Hồ sơ <CircleUser />
                </a>
              </div>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100  flex justify-between"
              >
                Đăng xuất
                <LogOut />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
