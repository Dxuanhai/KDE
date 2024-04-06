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

const Role = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    fullName: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleUpdated, setRoleUpdated] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [dataRole, setDataRole] = useState({
    roleName: "",
    permissions: [],
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
          setCurrentUser({
            fullName: response.data.profile.fullName,
            email: response.data.profile.email,
            role: response.data.profile.role.role,
          });
        }
      } catch (error) {
        console.error("Error fetching roles: ", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("https://apikde.vercel.app/api/role");
        if (response.data) {
          setRoles(response.data);
        }
      } catch (error) {
        console.error("Error fetching roles: ", error);
      }
    };

    const fetchPermissions = async () => {
      try {
        const response = await axios.get(
          "https://apikde.vercel.app/api/permission"
        );
        if (response.data) {
          setPermissions(response.data);
        }
      } catch (error) {
        console.error("Error fetching permissions: ", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCurrentUser(), fetchRoles(), fetchPermissions()]);
      setIsLoading(false);
    };

    fetchData();
  }, [userId, roleUpdated]);

  const closeModal = () => {
    setIsModalOpen(false);
    setDataRole({
      roleName: "",
      permissions: [],
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

    if (dataRole.roleName.trim() === "" || dataRole.permissions.length === 0) {
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
      return;
    }

    setIsFormValid(true);

    try {
      const requestData = {
        roleName: dataRole.roleName,
        permissions: dataRole.permissions.map((permissionName) => ({
          name: permissionName,
        })),
      };

      const response = await axios.post(
        "https://apikde.vercel.app/api/role",
        requestData
      );
      if (response.data) {
        closeModal();
        setDataRole({
          permissions: [],
          roleName: "",
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
    if (currentUser !== "Admin") {
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

    try {
      const res = await axios.delete("https://apikde.vercel.app/api/role", {
        data: {
          id: id,
        },
      });
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
            ADD ROLE
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Permissons</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles &&
              roles.length > 0 &&
              roles.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.roleName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-2">
                      {item.permissions &&
                        item.permissions.length > 0 &&
                        item.permissions.map((i) => (
                          <div key={i.id}>
                            <Badge>{i.permission.permissionName}</Badge>
                          </div>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium flex justify-center">
                    <DropdownMenu className="">
                      <DropdownMenuTrigger asChild>
                        <Ellipsis className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40  ">
                        <DropdownMenuCheckboxItem className="flex justify-start gap-4 cursor-pointer mb-2">
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
                <CardTitle>Role</CardTitle>
                <CardDescription>Create new role</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Role Name</Label>
                      <Input
                        id="roleName"
                        value={dataRole.roleName}
                        placeholder="Enter role name"
                        onChange={(e) =>
                          setDataRole({
                            ...dataRole,
                            roleName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="permission">Permissions</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={`permission-${permission.id}`}
                              checked={dataRole.permissions.includes(
                                permission.permissionName
                              )}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setDataRole({
                                    ...dataRole,
                                    permissions: [
                                      ...dataRole.permissions,
                                      permission.permissionName,
                                    ],
                                  });
                                } else {
                                  setDataRole({
                                    ...dataRole,
                                    permissions: dataRole.permissions.filter(
                                      (id) => id !== permission.permissionName
                                    ),
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`permission-${permission.id}`}>
                              {permission.permissionName}
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
    </>
  );
};

export default Role;
