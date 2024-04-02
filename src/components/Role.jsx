import { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { Badge } from "@/components/ui/badge";
import axios from 'axios';

const Role = () => {
    const [roles, setRoles] = useState();
    const [isAdding, setIsAdding] = useState(false);
    const [newRole, setNewRole] = useState({ roleName: '', permission: '' });


    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://apikde.vercel.app/api/role');
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles: ", error);
        }
    };

    const handleAddRole = () => {
        setIsAdding(true);
    };

    const handleSaveNewRole = async () => {
        if (!newRole.roleName || !newRole.permission) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        await addRole(newRole);
        setNewRole({ roleName: '', permission: '' });
        setIsAdding(false);
    };

    const handleRoleChange = (e) => {
        setNewRole({ ...newRole, roleName: e.target.value });
    };

    const handlePermissionChange = (e) => {
        setNewRole({ ...newRole, permission: e.target.value });
    };

    const handleCancel = () => {
        setIsAdding(false);
    };

    const addRole = async (roleName) => {
        try {
            const response = await axios.post('https://apikde.vercel.app/api/role', roleName);
            setRoles([...roles, response.data]);
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    // const updateRole = async (id, updatedRole) => {
    //     try {
    //         await axios.put(`/api/roles/$`, {id}, updatedRole);
    //         fetchRoles();
    //     } catch (error) {
    //         console.error('Error updating role:', error);
    //     }
    // };

    // const deleteRole = async (id) => {
    //     try {
    //         await axios.delete(`/api/roles/$`, {id});
    //         fetchRoles();
    //     } catch (error) {
    //         console.error('Error deleting role:', error);
    //     }
    // };

    
    const columns = [
        {
            name: <Badge variant={"outline"}>ROLE</Badge>,
            selector: 'role',
            sortable: true,
            sortFunction: (rowA, rowB) => rowA.role.localeCompare(rowB.role),
            cell: row => <Badge>{row.roleName}</Badge>,
        },
        {
            name: <Badge variant={"outline"}>PERMISSION</Badge>,
            selector: (row) => <Badge>{row.permission}</Badge>,
        },
    ];

    return (
        <div className="px-10 pt-8 w-full">
            <div className=" w-full h-auto bg-red-50 mt-10">
                {isAdding ? (
                    <div>
                        <input
                            type="text"
                            value={newRole.roleName}
                            onChange={handleRoleChange}
                            placeholder="Nhập role mới"
                        />
                        <input
                            type="text"
                            value={newRole.permission}
                            onChange={handlePermissionChange}
                            placeholder="Nhập quyền cho role"
                        />
                        <button onClick={handleSaveNewRole}>Lưu</button>
                        <button onClick={handleCancel}>Hủy</button>
                    </div>
                ) : (
                    <button onClick={handleAddRole}>Thêm Role Mới</button>
                )}
                <DataTable 
                    columns={columns}
                    data={roles} 
                    pagination
                />
            </div>
        </div>
    );
};

export default Role;