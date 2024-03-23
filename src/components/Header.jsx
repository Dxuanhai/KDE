import { Search } from "lucide-react";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="h-20 w-full  flex  justify-between ">
      <div className="h-10 w-3/5 my-5 bg-white  rounded-md flex relative items-center text-gray-400">
        <input
          type="text"
          id="email-input"
          className="px-12 w-full h-full  rounded-md focus:outline-none"
          placeholder="Search"
        />

        <Search className=" absolute ml-3 cursor-pointer" />
      </div>

      <div className=" w-36  justify-between  mt-5 flex ">
        <div className="bg-white h-10 w-10 ml-10 rounded-md flex relative items-center ">
          <Bell className="mb-2.5 text-6xl absolute  ml-2 mt-2" />
        </div>

        <div className="">
          <img
            className="h-10 w-10 ml-13 rounded-md"
            src="https://img.freepik.com/premium-photo/cartoon-game-avatar-logo-gaming-brand_902820-467.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
