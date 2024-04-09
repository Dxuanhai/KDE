import { useRef, useState } from "react";
import axios from "axios";
import {
  Bell,
  Search,
  Keyboard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

export default function Header() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  let menuRef = useRef();
  const userId = localStorage.getItem("userId");
  const openProfile = async () => {
    const res = await axios.get(
      `https://apikde.vercel.app/api/profile/${userId}`
    );
    if (res.data) {
      setUserData({
        fullName: res.data.profile.fullName,
        email: res.data.profile.email,

        role: res.data.profile.role.role,
      });
      setIsOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "/login";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://apikde.vercel.app/api/profile/${userId}`,
        {
          fullName: userData.fullName,
        }
      );
      if (res.data) {
        setUserData(res.data.profile);
        setIsOpen(false);
        toast({
          className: "bg-[#60cd18] text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Check />
              <span>Your profile updated successfully</span>
            </div>
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Card className="w-[350px] z-10">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={userData.fullName}
                        onChange={(e) =>
                          setUserData({ ...userData, fullName: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 pointer-events-none">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={userData.email} readOnly />
                    </div>
                    <div className="flex flex-col space-y-1.5 pointer-events-none">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        placeholder="Name of your project "
                        value={userData.role}
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between ">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Update
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
      <div className="md:h-30 w-full  md:w-2/3  xl:w-full  flex  justify-between ">
        <div className="h-10 w-2/3  md:w-2/3 xl:w-3/5 my-5 bg-white  rounded-md flex relative items-center text-gray-400">
          <input
            type="text"
            id="email-input"
            className="px-12 w-full h-full  rounded-md focus:outline-none"
            placeholder="Search"
          />

          <Search className=" absolute ml-3  cursor-pointer" />
        </div>
        <div className=" w-24 mt-5 flex justify-between  ">
          <div className="bg-white h-10 w-10  rounded-md flex relative items-center ">
            <Bell className="mb-2.5  absolute  ml-2 mt-2 cursor-pointer" />
          </div>

          <div ref={menuRef} className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  className="h-10 w-10 rounded-md cursor-pointer"
                  src="https://github.com/shadcn.png"
                  alt=""
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => openProfile()}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
