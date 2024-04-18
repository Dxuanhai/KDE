import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import moment from 'moment';
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

              <DropdownMenuCheckboxItem
              className="flex justify-start gap-4 cursor-pointer mb-2"
              >
                <span className="font-bold">Decentralization</span>
              </DropdownMenuCheckboxItem>

            
              <DropdownMenuCheckboxItem
              className="flex justify-start gap-4 cursor-pointer mb-2"
              >
                <button className="font-bold" onClick={() => handleDeletePerson(row.id)}>Delete</button>
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

  //User profile
  const [isOpen, setIsOpen] = useState(false);
  const openProfile = async (row) => {
    const res = await axios.get(
      `https://apikde.vercel.app/api/profile/${row}`
    );
    if (res.data) {
      setUserEditData({
        fullName: res.data.profile.fullName,
        email: res.data.profile.email,
        genders: res.data.profile.genders,
      });
      setIsOpen(true);
    }
  };

 //edit user
 const [editingUserId, setEditingUserId] = useState(null);
const [editedUserData, setEditedUserData] = useState({
  id: "",
  fullName: "",
  email: "",
  genders: "",
});
const openEditForm = (rowData) => {
  setEditedUserData(rowData);
  setEditingUserId(rowData.id);
};

const handleUpdateUser = async () => {
  try {
    // Gọi API để cập nhật thông tin người dùng
    await axios.put(`https://apikde.vercel.app/api/profile/${editedUserData.id}`, editedUserData);
    // Cập nhật lại danh sách người dùng trong state
    const updatedData = data.map((user) =>
      user.id === editedUserData.id ? editedUserData : user
    );
    setData(updatedData);
    // Đóng form chỉnh sửa
    setEditingUserId(null);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

//datatable
  const [data, setData] = useState([]);
  useEffect(() => {
    // Giả định hàm fetchData từ API để lấy dữ liệu
    const fetchData = async () => {
      try {
        // Call API
        const response = await fetch('https://apikde.vercel.app/api/profile');
        setData(response.data);

        // Định dạng lại ngày/giờ cho mỗi đối tượng trong mảng dữ liệu
        const apiData = await response.json();
        const formattedData = apiData.map(item => ({
          ...item,
          createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')
        }));
        
        // Cập nhật state với dữ liệu đã định dạng lại
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Gọi hàm fetchData khi component được mount
    fetchData();
  }, []);


  //delete
  const handleDeletePerson = async (id) => {
    try {
      // Gọi API để xóa người
      await fetch(`https://apikde.vercel.app/api/profile/${id}`, {
        method: 'DELETE'
      });
      // Nếu xóa thành công, cập nhật lại danh sách người trong state
      const newData = data.filter(people => people.id !== id);
      setData(newData);
    } catch (error) {
      console.error('Error deleting person:', error);
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
                <CardDescription>
                  Profile information.
                </CardDescription>
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
                      <Input id="genders" value={userEditData.genders} readOnly />
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
                <CardDescription>
                  Update user's information.
                </CardDescription>
              </CardHeader>
              <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input  type="text"
                    value={editedUserData.fullName}
                    onChange={(e) =>
                      setEditedUserData({ ...editedUserData, fullName: e.target.value })
                    } />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input  type="email"
                    value={editedUserData.email}
                    onChange={(e) =>
                      setEditedUserData({ ...editedUserData, email: e.target.value })
                    } />
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Gender</Label>
                <Input  type="text"
                    value={editedUserData.genders}
                    onChange={(e) =>
                      setEditedUserData({ ...editedUserData, genders: e.target.value })
                    } />
                </div>
              </div>
              </CardContent>
              <CardFooter className="flex justify-between ">
                <Button onClick={handleUpdateUser}>
                  Update
                </Button>
                <Button variant="outline" onClick={() => setEditingUserId(null)}>
                  Cancel
                </Button>
              </CardFooter>
              </Card>
          </div>
        </>
      )}

    <div className=" w-full overflow-y-auto max-h-80 bg-red-50 mt-10">
      <DataTable w-96 overflow-x-scroll
        columns={column}
        noDataComponent=""
        data={data}
        pagination
        selectableRows
        paginationPerPage={8} // Display 8 rows per page
        paginationRowsPerPageOptions={[8, 16, 24]} // Set pagination options
      ></DataTable>
    </div>
</>
  );
}
