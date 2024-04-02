import DataTable from "react-data-table-component";
import { Badge } from "@/components/ui/badge";

const column = [
    {
        name: <Badge variant={"outline"}>ROLE</Badge>,
        selector: 'role',
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.role.localeCompare(rowB.role),
        cell: row => <Badge>{row.role}</Badge>,
    },
    {
        name: <Badge variant={"outline"}>PERMISSION</Badge>,
        selector: (row) => <Badge>{row.permission}</Badge>,
    },
]

const roleData = [
    {
        role: "Quản trị viên",
        permission: "Truy cập tất cả các tính năng",
    },
    {
        role: "Người dùng",
        permission: "Truy cập các tính năng cơ bản",
    },
]
function Role() {
    return (
        <div className="px-10 pt-8 w-full">
            <div className=" w-full h-auto bg-red-50 mt-10">
                <DataTable 
                    columns={column}
                    data={roleData} 
                    pagination
                ></DataTable>
            </div>
        </div>
    );
}

export default Role