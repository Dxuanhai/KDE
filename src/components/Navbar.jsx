import { LayoutDashboard, User } from "lucide-react";

const data = [
  {
    id: 1,
    icon: <LayoutDashboard />,
    name: "Dashboard",
  },
  {
    id: 2,
    icon: <User />,
    name: "User Management",
  },
];

export default function Navbar() {
  return (
    <div className="pt-16">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 py-4 hover:opacity-50 cursor-pointer"
        >
          <i>{item.icon}</i>
          <span className=" ">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
