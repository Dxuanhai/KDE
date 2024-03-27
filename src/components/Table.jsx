import DataTable from "react-data-table-component";

export default function Table() {
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "CREATE AT",
      selector: (row) => row.create,
      sortable: true,
    },
    {
      name: "GENDER",
      selector: (row) => row.gender,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "johnDoe@gmail.com",
      create: "20 Jan 2008",
      gender: "Male",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janeSmith@yahoo.com",
      create: "15 Feb 2009",
      gender: "Female",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "aliceJohnson@hotmail.com",
      create: "7 Jul 2014",
      gender: "Other",
    },
    {
      id: 4,
      name: "Robert Brown",
      email: "robertbrown@hotmail.com",
      create: "30 Dec 2012",
      gender: "Male",
    },
  ];
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
