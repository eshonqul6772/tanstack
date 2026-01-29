import { Badge, Group } from '@mantine/core';
import { STATUS_VARIANT } from '@/shared/lib/utils/enums';
import type { ReactNode } from 'react';

import type { IEntity } from '../../model/types';
import TableContainer, { type ColumnDef } from '@/shared/ui/table/TableContainer';
import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

interface Props {
  data: IEntity.User[];
  pagination: PaginationParams;
  rowCount: number;
  renderActions: (user: IEntity.User) => ReactNode;
}

export const UserTable = ({
  data,
  pagination,
  rowCount,
  renderActions
}: Props) => {
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
      cell: ({ row }) => <Group gap="xs">{renderActions(row.original)}</Group>
    }
  ];

  return (
    <TableContainer
      data={data}
      columns={columns}
      pagination={pagination}
      rowCount={rowCount}
    />
  );
};
