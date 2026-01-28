import { useMemo } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

import Table, { type ColumnDef, type SortingState } from './Table';

interface Props<T extends Record<string, any>> {
  columns: ColumnDef<T>[];
  data: T[];
  rowCount: number;
  pagination: PaginationParams;
  defaultSort?: string;
}

const TableContainer = <T extends Record<string, any>>({
  columns,
  data,
  rowCount,
  pagination,
  defaultSort
}: Props<T>) => {
  const search = useRouterState({ select: state => state.location.search }) as unknown as Record<string, unknown>;
  const navigate = useNavigate();

  const sortParam = (typeof search.sort === 'string' ? search.sort : '') || defaultSort || '';
  const sorting = useMemo<SortingState[]>(
    () =>
      sortParam
        ? [
            {
              id: sortParam.startsWith('-') ? sortParam.slice(1) : sortParam,
              desc: sortParam.startsWith('-')
            }
          ]
        : [],
    [sortParam]
  );

  const updateSearch = (updates: Record<string, unknown>) => {
    navigate({
      search: ((prev: Record<string, unknown> | undefined) => {
        const prevSearch = (prev ?? {}) as Record<string, unknown>;
        const next: Record<string, unknown> = { ...prevSearch };
        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            delete next[key];
          } else {
            next[key] = value;
          }
        });
        return next;
      }) as any
    }).then(r => r);
  };

  const handlePaginationChange = (next: PaginationParams) => {
    updateSearch({
      page: next.pageIndex + 1,
      perPage: next.pageSize
    });
  };

  const handleSortingChange = (nextSorting: SortingState[]) => {
    const sortValue = nextSorting.length > 0 ? `${nextSorting[0].desc ? '-' : ''}${nextSorting[0].id}` : undefined;

    updateSearch({
      sort: sortValue,
      page: 1
    });
  };

  return (
    <Table
      data={data}
      columns={columns}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      rowCount={rowCount}
      filters={{}}
      onFilterChange={() => {}}
      sorting={sorting}
      onSortingChange={handleSortingChange}
    />
  );
};

export default TableContainer;
