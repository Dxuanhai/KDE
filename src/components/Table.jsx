import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { Check, Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

export default function Table() {
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "GENDER",
      selector: (row) => row.genders,
      sortable: true,
    },
    {
      name: "CREATE AT",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="btn btn-danger">
                <PiDotsThreeOutlineFill />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                className="flex justify-start gap-4 cursor-pointer mb-2"
                onClick={() => openProfile(row.id)}
              >
                <span className="font-bold">User Profile</span>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                className="flex justify-start gap-4 cursor-pointer mb-2"
                onClick={() => openEditForm(row)}
              >
                <span className="font-bold">Edit User</span>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem className="flex justify-start gap-4 cursor-pointer mb-2">
                <span
                  className="font-bold"
                  onClick={() => openChangeRoleForm(row.id)}
                >
                  ChangeRole
                </span>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem className="flex justify-start gap-4 cursor-pointer mb-2">
                <button
                  className="font-bold"
                  onClick={() => handleDeletePerson(row.id)}
                >
                  Delete
                </button>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
      ),
    },
  ];

  const [userEditData, setUserEditData] = useState({
    fullName: "",
    email: "",
    genders: "",
  });
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  //edit user
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    id: "",
    fullName: "",
    email: "",
    genders: "",
  });
  const [ChangeRoleModal, setChangeRoleModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    fullName: "",
    role: "",
    genders: "",
  });
  const [targetUser, setTargetUser] = useState({
    email: "",
    fullName: "",
    role: "",
    genders: "",
  });
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Giả định hàm fetchData từ API để lấy dữ liệu
    const fetchData = async () => {
      try {
        // Call API
        const response = await fetch("https://apikde.vercel.app/api/profile");
        setData(response.data);

        // Định dạng lại ngày/giờ cho mỗi đối tượng trong mảng dữ liệu
        const apiData = await response.json();
        const formattedData = apiData
          .map((item) => ({
            ...item,
            createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
          }))
          .reverse();

        // Cập nhật state với dữ liệu đã định dạng lại
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Gọi hàm fetchData khi component được mount
    fetchData();
  }, [reload]);

  const openProfile = async (row) => {
    const res = await axios.get(`https://apikde.vercel.app/api/profile/${row}`);
    if (res.data) {
      setUserEditData({
        fullName: res.data.profile.fullName,
        email: res.data.profile.email,
        genders: res.data.profile.genders,
      });
      setIsOpen(true);
    }
  };

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
          genders: response.data.profile.genders,
        });
      }
    } catch (error) {
      console.error("Error fetching roles: ", error);
    }
  };
  const fetchTargetUser = async (id) => {
    try {
      const response = await axios.get(
        `https://apikde.vercel.app/api/profile/${id}`
      );
      if (response.data) {
        setTargetUser({
          fullName: response.data.profile.fullName,
          email: response.data.profile.email,
          role: response.data.profile.role.role,
          genders: response.data.profile.genders,
        });
      }
    } catch (error) {
      console.error("Error fetching roles: ", error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const openEditForm = (rowData) => {
    setEditedUserData(rowData);
    setEditingUserId(rowData.id);
  };
  const openChangeRoleForm = () => {
    setChangeRoleModal(true);
  };

  const authorization = () => {
    if (currentUser.role !== "Admin" && currentUser.role !== "Manager") {
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Only Admin and Manager can do</span>
          </div>
        ),
      });
      return true;
    }
    if (currentUser.role === targetUser.role) {
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>You don't have permissons enough</span>
          </div>
        ),
      });
      return true;
    }
    if (targetUser.role === "Admin") {
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Unable to delete Admin</span>
          </div>
        ),
      });
      return true;
    }
  };

  const handleUpdateUser = async () => {
    await fetchTargetUser(editedUserData.id);
    if (authorization() === true) return;

    try {
      const res = await axios.put(
        `https://apikde.vercel.app/api/profile/${editedUserData.id}`,
        editedUserData
      );
      // Cập nhật lại danh sách người dùng trong state
      const updatedData = data.map((user) =>
        user.id === editedUserData.id ? editedUserData : user
      );
      setData(updatedData);
      // Đóng form chỉnh sửa
      setEditingUserId(null);
      if (res.data) {
        toast({
          className: "bg-[#60cd18] text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Check />
              <span>updated the profile successfully</span>
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
            <span>Error updated profile. Please try again.</span>
          </div>
        ),
      });
    }
  };

  //delete
  const handleDeletePerson = async (id) => {
    await fetchTargetUser(id);
    if (authorization() === true) return;
    if (currentUser.email === targetUser.email) {
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Unable to delete yourself</span>
          </div>
        ),
      });
      return true;
    }
    try {
      const res = await axios.delete(
        `https://apikde.vercel.app/api/profile/${id}`
      );
      if (res.data) {
        toast({
          className: "bg-[#60cd18] text-white font-bold",
          description: (
            <div className="flex items-center gap-4">
              <Check />
              <span>deleted the profile successfully</span>
            </div>
          ),
        });
      }
      setReload(!reload);
    } catch (error) {
      console.log("🚀  / confirmDelete  / error:", error);
      toast({
        className: "bg-red-500 text-white font-bold",
        description: (
          <div className="flex items-center gap-4">
            <Trash2 />
            <span>Error deleted profile. Please try again.</span>
          </div>
        ),
      });
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
                <CardTitle>User's Profile</CardTitle>
                <CardDescription>Profile information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 pointer-events-none">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={userEditData.fullName} readOnly />
                  </div>
                  <div className="flex flex-col space-y-1.5 pointer-events-none">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={userEditData.email} readOnly />
                  </div>
                  <div className="flex flex-col space-y-1.5 pointer-events-none">
                    <Label htmlFor="genders">Gender</Label>
                    <Input id="email" value={userEditData.genders} readOnly />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end ">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      {ChangeRoleModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Card className="w-[350px] z-10">
              <CardHeader>
                <CardTitle>Update Role's profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 pointer-events-none">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={userEditData.fullName} readOnly />
                  </div>
                  <div className="flex flex-col space-y-1.5 pointer-events-none">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={userEditData.email} readOnly />
                  </div>
                  <div className="flex flex-col space-y-1.5 pointer-events-none">
                    <Label htmlFor="genders">Gender</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end ">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      {editingUserId && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Card className="w-[350px] z-10">
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>Update user's information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      value={editedUserData.fullName}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      type="email"
                      value={editedUserData.email}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Gender</Label>
                    <Select
                      value={editedUserData.genders}
                      defaultValue={editedUserData.genders}
                      onValueChange={(value) =>
                        setEditedUserData({ ...editedUserData, genders: value })
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
              </CardContent>
              <CardFooter className="flex justify-between ">
                <Button onClick={handleUpdateUser}>Update</Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingUserId(null)}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      <div className=" w-full overflow-y-auto max-h-90 mb-8  bg-red-50 mt-10">
        <DataTable
          w-96
          overflow-x-scroll
          columns={column}
          noDataComponent=""
          data={data}
          pagination
          selectableRows
          paginationPerPage={10} // Display 8 rows per page
          paginationRowsPerPageOptions={[10, 20, 30]} // Set pagination options
        ></DataTable>
      </div>
    </>
  );
}
