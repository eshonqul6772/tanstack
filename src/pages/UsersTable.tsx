import React from 'react';
import TanstackTable from '@/components/TanstackTable.tsx';

interface User {
    id?: number;
    name?: string;
    email?: string;
    age?: number;
    status?: 'active' | 'inactive';
}

const UsersTable = () => {
    const [data] = React.useState<User[]>([
        {id: 1, name: 'John Doe', email: 'john@example.com', age: 25, status: 'active'},
        {id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30, status: 'inactive'},
        // ... more data
    ]);

    const columns: ({
        accessorKey: string;
        header: string;
        cell: (info) => [User][User extends any ? 0 : never]
    } | {
        accessorKey: string;
        header: string;
        cell: (info) => [User][User extends any ? 0 : never];
        enableSorting: boolean;
        enableFiltering: boolean
    } | { accessorKey: string; header: string; cell: (info) => [User][User extends any ? 0 : never] } | {
        accessorKey: string;
        header: string;
        cell: (info) => [User][User extends any ? 0 : never]
    } | { accessorKey: string; header: string; cell: (info) => React.JSX.Element; filterFn: string })[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'name',
            header: 'Ism',
            cell: info => info.getValue(),
            enableSorting: true,
            enableFiltering: true,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'age',
            header: 'Yosh',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Holat',
            cell: info => (
                <span
                    className={`px-2 py-1 rounded ${info.getValue() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {info.getValue()}
        </span>
            ),
            filterFn: 'includes',
        },
    ];

    const handleRowSelection = (selectedRows: User[]) => {
        console.log('Selected rows:', selectedRows);
        // Tanlangan qatorlar bilan ishlash
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Foydalanuvchilar</h1>
            <TanstackTable
                data={data}
                columns={columns}
                enableSorting={true}
                enableFiltering={true}
                enablePagination={true}
                enableRowSelection={true}
                pageSize={10}
                onRowSelectionChange={handleRowSelection}
                className="shadow-lg"
            />
        </div>
    );
};

export default UsersTable;