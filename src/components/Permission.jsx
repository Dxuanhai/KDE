import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  Ellipsis,
  Mail,
  ShieldQuestion,
  Trash2,
  User,
  UserCog,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

const Permission = () => {
  const { toast } = useToast();
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [descriptions , setDescriptions] = useState([]);
  const [currentUser, setCurentUser] = useState({
    email: "",
    fullName: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [roleUpdated, setRoleUpdated] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [dataPermission, setDataPermission] = useState({
    permissionName: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `https://apikde.vercel.app/api/profile/${userId}`
        );
        if (response.data) {
          setCurentUser({
            fullName: response.data.profile.fullName,
            email: response.data.profile.email,
            role: response.data.profile.role.role,
          });
        }
      } catch (error) {
        console.error("Error fetching roles: ", error);
      }
    };

    const fetchPermissons = async () => {
      try {
        const response = await axios.get("https://apikde.vercel.app/api/permission");
        if (response.data) {
          setPermissions(response.data);
        }
      } catch (error) {
        console.error("Error fetching roles: ", error);
      }
    };

    const fetchDescriptions = async () => {
      try {
        const response = await axios.get(
          "https://apikde.vercel.app/api/permission"
        );
        if (response.data) {
          setDescriptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching roles: ", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCurrentUser(), fetchPermissons(), fetchDescriptions()]);
      setIsLoading(false);
    };

    fetchData();
  }, [userId, roleUpdated]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setDataPermission({
      permissionName: "",
      description: "",
    });
  };

  const handleCreateRole = async () => {
    if (currentUser.role !== "Admin") {
      toast({
        className: "bg-red-500 text-wh  ite font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Only Admin can do</span>
          </div>
        ),
      });
      return;
    }

    if (dataPermission.permissionName.trim() === "") {
      setIsFormValid(false);
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Please fill in all the required fields</span>
          </div>
        ),
      });
      return
    }

    setIsFormValid(true);

    try {
      const requestData = {
        permissionName: dataPermission.permissionName,
        description: dataPermission.description,
      };

      console.log(requestData)
      const response = await axios.post(
        "https://apikde.vercel.app/api/permission",
        requestData
      );
      if (response.data) {
        closeModal();
        setDataPermission({
          permissionName: "",
          description: "",
        });
        setRoleUpdated(!roleUpdated);
        toast({
          className: "bg-[#60cd18] text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Check />
              <span>Created new role successfully</span>
            </div>
          ),
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo role:", error);
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Error creating role. Please try again.</span>
          </div>
        ),
      });
    }
  };






  const confirmDelete = async (id) => {
    if (currentUser.role !== "Admin") {
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Only Admin can do</span>
          </div>
        ),
      });
      return;
    }

    if (currentUser.role === "Admin") {
      try {
        const res = await axios.delete("https://apikde.vercel.app/api/permission", {
          data: {
            id: id,
          }
        }
        
      );
        if (res.data) {
          setRoleUpdated(!roleUpdated);
          toast({
            className: "bg-[#60cd18] text-white font-bold",
            description: (
              <div className="flex items-center gap-4">
                <Check />
                <span>Delete the role successfully</span>
              </div>
            ),
          });
        }
      } catch (error) {
        console.log("🚀  / confirmDelete  / error:", error);
        toast({
          className: "bg-red-500 text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Trash2 />
              <span>Error deleted role. Please try again.</span>
            </div>
          ),
        });
      }
    }
  };


  const handleEditPermission = (id) => {
    setSelectedPermissionId(id);
    setIsModalUpdateOpen(true);
  }


  const handleUpdatePermission = async (id) => {
    if (currentUser.role !== "Admin") {
      toast({
        className: "bg-red-500 text-wh  ite font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Only Admin can do</span>
          </div>
        ),
      });
      return;
    }

    if (dataPermission.permissionName.trim() === "") {
      setIsFormValid(false);
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Please fill in all the required fields</span>
          </div>
        ),
      });
      return
    }

    setIsFormValid(true);

    try {
      const requestData = {
        id: id,
        permissionName: dataPermission.permissionName,
        description: dataPermission.description,
      };

      console.log(requestData)
      const response = await axios.put(
        "https://apikde.vercel.app/api/permission",requestData,
      );
      if (response.data) {
        closeModal();
        setDataPermission({
          permissionName: "",
          description: "",
        });
        setRoleUpdated(!roleUpdated);
        toast({
          className: "bg-[#60cd18] text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Check />
              <span>Updated new role successfully</span>
            </div>
          ),
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo role:", error);
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Error updating role. Please try again.</span>
          </div>
        ),
      });
    }
  };





  return (
    <>
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="px-10 pt-8 w-full">
        <div className="grid grid-cols-[1fr_9fr] h-[200px] w-full items-center">
          <div>
            <Avatar className="h-40 w-40 shadow-[rgba(0,0,15,0.5)_12px_0px_4px_0px] ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-6 py-2    bg-white -ml-20 pl-24 rounded-br-3xl rounded-tr-3xl shadow-md shadow-white">
            <div className="-ml-3 flex justify-start gap-x-2 hover:opacity-40  cursor-pointer">
              <User />:
              <span className="font-bold"> {currentUser.fullName}</span>
            </div>
            <div className=" flex justify-start gap-x-2 hover:opacity-40  cursor-pointer">
              <Mail />:<span className="font-bold"> {currentUser.email}</span>
            </div>
            <div className="-ml-3 flex justify-start gap-x-2 hover:opacity-40  cursor-pointer">
              <ShieldQuestion />:
              <span className="font-bold">
                <Badge className="bg-red-500">{currentUser.role}</Badge>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end  mb-10 ">
          <Button
            className=" py-4 px-6 "
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
          >
            ADD PERMISSION
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions &&
              permissions.length > 0 &&
              permissions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.permissionName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-2">
                      {descriptions &&
                        descriptions.length > 0 &&
                          <div key={item.id}>
                            <Badge>{item.description}</Badge>
                          </div>
                          }
                    </div>
                  </TableCell>
                  <TableCell className="font-medium flex justify-center">
                    <DropdownMenu className="">
                      <DropdownMenuTrigger asChild>
                        <Ellipsis className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40  ">
                        <DropdownMenuCheckboxItem 
                          className="flex justify-start gap-4 cursor-pointer mb-2"
                          onClick={() => handleEditPermission(item.id)}
                        >
                          <UserCog />
                          <span className="font-bold">Edit</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          className="flex justify-start gap-4 cursor-pointer mb-2"
                          onClick={() => confirmDelete(item.id)}
                        >
                          <Trash2 />
                          <span className="font-bold">Delete</span>
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Card className="w-[350px] z-10">
              <CardHeader>
                <CardTitle>Permission</CardTitle>
                <CardDescription>Create new permission</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Permission Name</Label>
                      <Input
                        id="permissionName"
                        value={dataPermission.permissionName}
                        placeholder="Enter permission name"
                        onChange={(e) =>
                          setDataPermission({
                            ...dataPermission,
                            permissionName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Description</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {descriptions.map((descriptions) => (
                          <div
                            key={descriptions.id}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={`descriptions-${descriptions.id}`}
                              checked={dataPermission.description === descriptions.description}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setDataPermission({
                                    ...dataPermission,
                                    description: descriptions.description
                                  });
                                } else {
                                  setDataPermission({
                                    ...dataPermission,
                                    description: '',
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`descriptions-${descriptions.id}`}>
                              {descriptions.description}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between ">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleCreateRole}>
                  Create
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}


      {isModalUpdateOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Card className="w-[350px] z-10">
              <CardHeader>
                <CardTitle>Permission</CardTitle>
                <CardDescription>Edit permission</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Permission Name</Label>
                      <Input
                        id="permissionName"
                        value={dataPermission.permissionName}
                        placeholder="Enter new permission name"
                        onChange={(e) =>
                          setDataPermission({
                            ...dataPermission,
                            permissionName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Description</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {descriptions.map((description) => (
                          <div key={description.id} className="flex items-center gap-2">
                            <Checkbox
                              id={`description-${description.id}`}
                              checked={dataPermission.description === description.description}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setDataPermission({
                                    ...dataPermission,
                                    description: description.description,
                                  });
                                } else {
                                  setDataPermission({
                                    ...dataPermission,
                                    description: '',
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`description-${description.id}`}>
                              {description.description}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between ">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                  <Button type="submit" onClick={() => handleUpdatePermission(selectedPermissionId)}>
                    Update
                  </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Permission;