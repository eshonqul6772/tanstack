import type { ReactNode } from 'react';
import { Badge, Group } from '@mantine/core';

import { STATUS_VARIANT } from '@/shared/lib/utils/enums';
import TableContainer, { type ColumnDef } from '@/shared/ui/table/TableContainer';

import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

import type { IEntity } from '../../model/types';

interface Props {
  data: IEntity.User[];
  pagination: PaginationParams;
  rowCount: number;
  actions: (user: IEntity.User) => ReactNode;
}

export const UserTable = ({ data, pagination, rowCount, actions }: Props) => {
  const columns: ColumnDef<IEntity.User>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name'
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name'
    },
    {
      accessorKey: 'username',
      header: 'Username'
    },
    {
      accessorKey: 'role.name',
      header: 'Role'
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return <Badge color={STATUS_VARIANT[status as keyof typeof STATUS_VARIANT] || 'gray'}>{status}</Badge>;
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <Group gap="xs">{actions(row.original)}</Group>
    }
  ];

  return <TableContainer data={data} columns={columns} pagination={pagination} rowCount={rowCount} />;
};
