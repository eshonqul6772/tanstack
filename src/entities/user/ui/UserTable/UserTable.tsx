import type { IEntity } from '../../model/types';
import Table, { type ColumnDef, type SortingState } from '@/shared/ui/table/Table';
import type { Filters, PaginationParams } from '@/widgets/layout/components/Sidebar/menu';
import { Badge, Group } from '@mantine/core';
import { STATUS_VARIANT } from '@/shared/lib/utils/enums';
import type { ReactNode } from 'react';

interface Props {
  data: IEntity.User[];
  pagination: PaginationParams;
  rowCount: number;
  onPaginationChange: (pagination: PaginationParams) => void;
  filters: Filters<IEntity.User>;
  onFilterChange: (filters: Partial<IEntity.User>) => void;
  sorting: SortingState[];
  onSortingChange: (sorting: SortingState[]) => void;
  renderActions: (user: IEntity.User) => ReactNode;
}

export const UserTable = ({
  data,
  pagination,
  rowCount,
  onPaginationChange,
  filters,
  onFilterChange,
  sorting,
  onSortingChange,
  renderActions
}: Props) => {
  const columns: ColumnDef<IEntity.User>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
      meta: { filterKey: 'firstName', filterVariant: 'text' }
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      meta: { filterKey: 'lastName', filterVariant: 'text' }
    },
    {
      accessorKey: 'username',
      header: 'Username',
      meta: { filterKey: 'username', filterVariant: 'text' }
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
    <Table
      data={data}
      columns={columns}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      rowCount={rowCount}
      filters={filters}
      onFilterChange={onFilterChange}
      sorting={sorting}
      onSortingChange={onSortingChange}
    />
  );
};
