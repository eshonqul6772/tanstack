import { type ReactNode, isValidElement } from 'react';
import { Table as MantineTable, Stack } from '@mantine/core';

import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

export interface ColumnDef<T> {
  id?: string;
  accessorKey?: keyof T | string;
  header: ReactNode | ((props: any) => ReactNode);
  cell?: (props: { row: { original: T } }) => ReactNode;
  enableSorting?: boolean;
  meta?: {
    filterKey?: keyof T;
    filterVariant?: 'number' | 'text';
    sticky?: 'left' | 'right';
    width?: number | string;
    align?: 'left' | 'center' | 'right';
  };
}

interface Props<T extends Record<string, any>> {
  columns: ColumnDef<T>[];
  data: T[];
  rowCount: number;
  pagination: PaginationParams;
}

const TableContainer = <T extends Record<string, any>>({ columns, data }: Props<T>) => {
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
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
    const value = accessor ? getNestedValue(row, accessor) : null;
    if (value === null || value === undefined || isValidElement(value)) return value;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') {
      const multiName = value as Record<string, string>;
      if (typeof multiName.uz === 'string' || typeof multiName.ru === 'string' || typeof multiName.en === 'string') {
        return multiName.uz || multiName.ru || multiName.en || '';
      }
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const getStickyStyles = (column: ColumnDef<T>) => {
    if (!column.meta?.sticky) {
      return {
        width: column.meta?.width,
        minWidth: column.meta?.width,
        textAlign: column.meta?.align
      };
    }
    const side = column.meta.sticky;
    return {
      position: 'sticky' as const,
      [side]: 0,
      zIndex: 2,
      background: 'var(--mantine-color-body)',
      width: column.meta.width,
      minWidth: column.meta.width,
      textAlign: column.meta.align,
      boxShadow:
        side === 'right' ? 'inset 1px 0 0 var(--mantine-color-gray-3)' : 'inset -1px 0 0 var(--mantine-color-gray-3)'
    };
  };

  return (
    <Stack gap="md">
      <div style={{ overflowX: 'auto' }}>
        <MantineTable striped highlightOnHover withTableBorder withColumnBorders>
          <MantineTable.Thead>
            <MantineTable.Tr>
              {columns.map((column, index) => {
                const key = column.id ?? (column.accessorKey as string) ?? String(index);
                return (
                  <MantineTable.Th key={key} style={getStickyStyles(column)}>
                    {renderHeader(column)}
                  </MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <MantineTable.Tr key={row.id || rowIndex}>
                  {columns.map((column, index) => {
                    const key = column.id ?? (column.accessorKey as string) ?? String(index);
                    return (
                      <MantineTable.Td key={key} style={getStickyStyles(column)}>
                        {renderCell(column, row)}
                      </MantineTable.Td>
                    );
                  })}
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
      </div>
    </Stack>
  );
};

export default TableContainer;
