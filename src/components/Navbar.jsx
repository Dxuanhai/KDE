import { LayoutDashboard, User, Settings, UserCog } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

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
    name: "User Management",
    path: "/user-management",
  },
  {
    id: 3,
    icon: <UserCog />,
    name: "Admin Management",
    path: "/admin-management",
  },
  {
    id: 4,
    icon: <Settings />,
    name: "Settings",
    path: "/settings",
  }
];

export default function Navbar() {
  return (
    <div className="pt-16">
      {data.map((item) => (
        <Link
          key={item.id}
          className="flex gap-4 py-4 hover:opacity-50 cursor-pointer"
          to={item.path}
        >
          <i>{item.icon}</i>
          <span className=" ">{item.name}</span>
        </Link>
      ))}
      <Outlet></Outlet>
    </div>
  );
}
