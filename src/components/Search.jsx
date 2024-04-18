import { useEffect, useState } from "react";
import axios from "axios";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "./ui/use-toast";
import { Check } from "lucide-react";
import { ToastAction } from "./ui/toast";

export default function Search() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    genders: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      genders: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description:
          "Please make sure your password and confirmed password are the same.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      const confirmPasswordInput = document.getElementById("confirmPassword");
      confirmPasswordInput.focus();
      return;
    }
    if (userData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password is too short",
        description: "Please enter a password with at least 6 characters.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      const passwordInput = document.getElementById("password");
      passwordInput.focus();
      return;
    }
    try {
      const res = await axios.post(
        `https://apikde.vercel.app/api/register`,
        userData
      );
      if (res.data) {
        setUserData(res.data.profile);
        closeModal();
        toast({
          className: "bg-[#60cd18] text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Check />
              <span>Created new profile successfully</span>
            </div>
          ),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Unknown error",

        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleAddUser = () => {
    openModal();
  };

  return (
    <div className="w-full flex justify-end my-8">
      <Button
        className=" py-4 px-6 mt-4"
        onClick={handleAddUser}
        variant="secondary"
      >
        ADD PROFILE
      </Button>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Card className="w-[350px] z-10">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Create your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={userData.fullName}
                        placeholder="Enter your name"
                        onChange={(e) =>
                          setUserData({ ...userData, fullName: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={userData.email}
                        placeholder="example@gmail.com"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 ">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        placeholder="6 -> 12 characters"
                        value={userData.password}
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 ">
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                      <Input
                        id="confirmPassword"
                        placeholder="Confirm your password "
                        value={userData.confirmPassword}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="Gender">Gender</Label>
                      <Select
                        value={userData.genders}
                        onValueChange={(value) =>
                          setUserData({ ...userData, genders: value })
                        }
                      >
                        <SelectTrigger id="Gender">
                          <SelectValue
                            placeholder="Select"
                            onSelect={(value) => {
                              console.log(value);
                            }}
                          />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between ">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Create
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
