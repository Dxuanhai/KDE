import {
  LayoutDashboard,
  User,
  Settings,
  UserCog,
  Menu,
  X,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const data = [
  {
    id: 1,
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <User />,
    name: "Role",
    path: "/role",
  },
  {
    id: 3,
    icon: <UserCog />,
    name: "Permission",
    path: "/permission",
  },
  {
    id: 4,
    icon: <Settings />,
    name: "Settings",
    path: "/settings",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="pt-16 flex flex-col sm:flex-row sticky top-0">
      <div className="hidden sm:block">
        {data.map((item) => (
          <Link
            key={item.id}
            className="flex flex-row gap-4 py-4 hover:opacity-50 cursor-pointer"
            to={item.path}
          >
            <i>{item.icon}</i>
            <span className=" ">{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="sm:hidden">
        <button
          className="hamburger-menu"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <div className="mobile-menu">
          {isMenuOpen && (
            <ul>
              {data.map((item) => (
                <Link
                  key={item.id}
                  className="flex flex-row gap-4 py-4 hover:opacity-50 cursor-pointer"
                  to={item.path}
                  onClick={handleLinkClick}
                >
                  <i>{item.icon}</i>
                  <span className=" ">{item.name}</span>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
