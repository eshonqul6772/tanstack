import { Badge, Group } from '@mantine/core';

import { STATUS_VARIANT } from '@/shared/lib/utils/enums.ts';
import TableContainer, { type ColumnDef } from '@/shared/ui/table/TableContainer.tsx';
import type { ListTableProps } from '@/shared/ui/table/types.ts';

import type { IEntity } from '../model/types.ts';

export const ListPaging = ({ data, pagination, rowCount, actions }: ListTableProps<IEntity.Data>) => {
  const columns: ColumnDef<IEntity.Data>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'tag',
      header: 'Tag'
    },
    {
      accessorKey: 'types',
      header: 'Types'
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
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Group gap="xs" justify="flex-end">
          {actions(row.original)}
        </Group>
      ),
      meta: {
        sticky: 'right',
        width: 160,
        align: 'right'
      }
    }
  ];

  return <TableContainer data={data} columns={columns} pagination={pagination} rowCount={rowCount} />;
};
