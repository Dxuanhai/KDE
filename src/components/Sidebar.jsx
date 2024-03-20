import Navbar from "./Navbar";
import { Link } from "react-router-dom";



export default function Sidebar() {
  return (
    <div className="h-full w-72 bg-white p-10">
      <h2 className="text-[#013CC6] text-3xl font-bold cursor-pointer w-0">
        <Link to={"/"}>
          KDE
        </Link>
      </h2>
      <Navbar />
    </div>
  );
}
