import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import moment from "moment";

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
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-danger"
          >
            <PiDotsThreeOutlineFill />
          </button>
          &nbsp;
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  // Gọi API
  const getData = async () => {
    try {
      let res = await axios.get("https://apikde.vercel.app/api/login");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-full h-auto bg-red-50 mt-10">
      <DataTable
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
