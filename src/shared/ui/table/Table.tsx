import { Group, Table as MantineTable, Pagination, Select, Stack, Text, TextInput } from '@mantine/core';
import type { ReactNode } from 'react';
import type { Filters, PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

export type SortDirection = 'asc' | 'desc' | null;

export interface SortingState {
  id: string;
  desc: boolean;
}

export interface ColumnDef<T> {
  id?: string;
  accessorKey?: keyof T | string;
  header: ReactNode | ((props: any) => ReactNode);
  cell?: (props: { row: { original: T } }) => ReactNode;
  enableSorting?: boolean;
  meta?: {
    filterKey?: keyof T;
    filterVariant?: 'number' | 'text';
  };
}

type Props<T extends Record<string, any>> = {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationParams;
  onPaginationChange: (pagination: PaginationParams) => void;
  rowCount: number;
  filters: Filters<T>;
  onFilterChange: (dataFilters: Partial<T>) => void;
  sorting: SortingState[];
  onSortingChange: (sorting: SortingState[]) => void;
};

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  pagination,
  onPaginationChange,
  rowCount,
  filters,
  onFilterChange,
  sorting,
  onSortingChange
}: Props<T>) {
  const handleSort = (columnId: string) => {
    const currentSort = sorting.find(s => s.id === columnId);
    if (!currentSort) {
      onSortingChange([{ id: columnId, desc: false }]);
    } else if (!currentSort.desc) {
      onSortingChange([{ id: columnId, desc: true }]);
    } else {
      onSortingChange([]);
    }
  };

  const getSortIcon = (columnId: string) => {
    const currentSort = sorting.find(s => s.id === columnId);
    if (!currentSort) return ' 🔃';
    return currentSort.desc ? ' 🔽' : ' 🔼';
  };

  const pageCount = Math.ceil(rowCount / (pagination.pageSize || DEFAULT_PAGE_SIZE));

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const renderHeader = (column: ColumnDef<T>) => {
    if (typeof column.header === 'function') {
      return column.header({});
    }
    return column.header;
  };

  const renderCell = (column: ColumnDef<T>, row: T) => {
    if (column.cell) {
      return column.cell({ row: { original: row } });
    }
    const accessor = column.accessorKey as string;
    return accessor ? getNestedValue(row, accessor) : null;
  };

  return (
    <Stack gap="md">
      <MantineTable striped highlightOnHover withTableBorder withColumnBorders>
        <MantineTable.Thead>
          <MantineTable.Tr>
            {columns.map((column, index) => {
              const columnId = column.id || (column.accessorKey as string) || index.toString();
              const isSortable = column.enableSorting !== false && !!column.accessorKey;

              return (
                <MantineTable.Th key={columnId}>
                  <Stack gap="xs">
                    <Group
                      gap="xs"
                      style={{ cursor: isSortable ? 'pointer' : 'default' }}
                      onClick={() => isSortable && handleSort(columnId)}
                    >
                      <Text fw={700} size="sm">
                        {renderHeader(column)}
                      </Text>
                      {isSortable && getSortIcon(columnId)}
                    </Group>
                    {column.meta?.filterKey ? (
                      <TextInput
                        size="xs"
                        onChange={e => {
                          onFilterChange({
                            [column.meta!.filterKey as keyof T]: e.currentTarget.value
                          } as Partial<T>);
                        }}
                        placeholder="Search..."
                        type={column.meta.filterVariant === 'number' ? 'number' : 'text'}
                        value={(filters[column.meta.filterKey] as string) ?? ''}
                      />
                    ) : null}
                  </Stack>
                </MantineTable.Th>
              );
            })}
          </MantineTable.Tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <MantineTable.Tr key={row.id || rowIndex}>
                {columns.map(column => (
                  <MantineTable.Td key={column.id}>{renderCell(column, row)}</MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))
          ) : (
            <MantineTable.Tr>
              <MantineTable.Td colSpan={columns.length} align="center">
                No data
              </MantineTable.Td>
            </MantineTable.Tr>
          )}
        </MantineTable.Tbody>
      </MantineTable>

      <Group justify="space-between">
        <Group gap="xs">
          <Text size="sm">Show</Text>
          <Select
            size="xs"
            w={70}
            value={pagination.pageSize.toString()}
            onChange={value => onPaginationChange({ ...pagination, pageSize: Number(value), pageIndex: 0 })}
            data={['10', '20', '30', '40', '50']}
          />
          <Text size="sm">per page</Text>
        </Group>

        <Pagination
          total={pageCount}
          value={pagination.pageIndex + 1}
          onChange={page => onPaginationChange({ ...pagination, pageIndex: page - 1 })}
          size="sm"
        />
      </Group>
    </Stack>
  );
}
