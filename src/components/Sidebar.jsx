import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-full sm:w-80 bg-white p-10 inline-block">
      <h2 className="text-[#013CC6] text-3xl font-bold cursor-pointer w-0">
        <Link to={"/"}>KDE</Link>
      </h2>
      <Navbar />
    </div>
  );
}
