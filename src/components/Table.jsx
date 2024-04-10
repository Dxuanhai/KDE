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
        <div>
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
              >
                <span className="font-bold">User Information</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
              className="flex justify-start gap-4 cursor-pointer mb-2"
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
              //onClick={() => confirmDelete(row.id)}
              >
                <span className="font-bold">Delete User</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </button>
        </div>
      ),
    },
  ];


  const [data, setData] = useState([]);
  useEffect(() => {
    // Giả định hàm fetchData từ API để lấy dữ liệu
    const fetchData = async () => {
      try {
        // Call API
        const response = await fetch('https://apikde.vercel.app/api/login');
        const apiData = await response.json();
        
        // Định dạng lại ngày/giờ cho mỗi đối tượng trong mảng dữ liệu
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

  return (
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
  );
}
