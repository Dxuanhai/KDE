import DataTable from "react-data-table-component";
import  React, { useState, useEffect } from 'react';
import axios from "axios";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import moment from 'moment';

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
      cell: (row) => <div>
        <button onClick={ ()=> handleDelete(row.id)} className="btn btn-danger"><PiDotsThreeOutlineFill /></button>&nbsp;
      </div>
    }
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
    <div className=" w-full h-auto bg-red-50 mt-10">
      <DataTable
        columns={column}
        noDataComponent=""
        data={data}
        pagination
        selectableRows
      ></DataTable>
    </div>
  );
}
