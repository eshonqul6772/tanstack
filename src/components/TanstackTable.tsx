import React, {useState, useEffect} from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    PaginationState,
    VisibilityState,
    RowSelectionState,
} from '@tanstack/react-table';

import config from '@/config';

interface TanstackTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    pageSize?: number | any;
    pageSizeOptions?: number[];
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    enableRowSelection?: boolean;
    enableColumnVisibility?: boolean;
    className?: string;
    onRowSelectionChange?: (selectedRows: TData[]) => void;
    loading?: boolean;
}

const TanstackTable = <TData extends object>({
                                                 data,
                                                 columns,
                                                 pageSize = 10,
                                                 pageSizeOptions = [1,5, 10, 20, 50, 100],
                                                 enableSorting = true,
                                                 enableFiltering = true,
                                                 enablePagination = true,
                                                 enableRowSelection = false,
                                                 enableColumnVisibility = true,
                                                 className = '',
                                                 onRowSelectionChange,
                                                 loading = false,
                                             }: TanstackTableProps<TData>) => {
    // State'lar
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });

    // Table instance
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        manualPagination: false,
        debugTable: config.app.isDev,
    });

    // Row selection change handler
    useEffect(() => {
        if (onRowSelectionChange) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            onRowSelectionChange(selectedRows);
        }
    }, [rowSelection, table, onRowSelectionChange]);

    // Loading skeleton
    if (loading) {
        return (
            <div className={`w-full overflow-x-auto ${className}`}>
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded mb-2"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-100 rounded mb-2"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Filter controls */}
            {enableFiltering && (
                <div className="flex flex-wrap gap-2 items-center">
                    {table.getAllColumns()
                        .filter(column => column.getCanFilter())
                        .map(column => (
                            <div key={column.id} className="flex items-center gap-2">
                                <label className="text-sm font-medium">{column.id}:</label>
                                {typeof column.columnDef.filterFn === 'string' && column.columnDef.filterFn === 'includes' ? (
                                    <input
                                        type="text"
                                        value={(column.getFilterValue() as string) ?? ''}
                                        onChange={e => column.setFilterValue(e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                        placeholder={`Filter ${column.id}`}
                                    />
                                ) : (
                                    <DebouncedInput
                                        value={(column.getFilterValue() as string) ?? ''}
                                        onChange={value => column.setFilterValue(value)}
                                        placeholder={`Search ${column.id}`}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            )}

            {/* Column visibility controls */}
            {enableColumnVisibility && (
                <div className="flex flex-wrap gap-2">
                    {table.getAllLeafColumns().map(column => (
                        <label key={column.id} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={column.getIsVisible()}
                                onChange={column.getToggleVisibilityHandler()}
                                className="rounded"
                            />
                            <span className="text-sm">{column.id}</span>
                        </label>
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="w-full overflow-x-auto border rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {enableRowSelection && (
                                <th className="px-6 py-3">
                                    <input
                                        type="checkbox"
                                        checked={table.getIsAllRowsSelected()}
                                        onChange={table.getToggleAllRowsSelectedHandler()}
                                        className="rounded"
                                    />
                                </th>
                            )}
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="flex items-center gap-1">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {enableSorting && header.column.getCanSort() && (
                                            <SortIcon direction={header.column.getIsSorted()}/>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                            {enableRowSelection && (
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={row.getIsSelected()}
                                        onChange={row.getToggleSelectedHandler()}
                                        className="rounded"
                                    />
                                </td>
                            )}
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
            <span className="text-sm">
              {table.getState().pagination.pageIndex + 1} /{' '}
                {table.getPageCount()} sahifa
            </span>
                        <span className="text-sm">
              Jami: {table.getFilteredRowModel().rows.length} ta
            </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Har sahifada:</span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => table.setPageSize(Number(e.target.value))}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                {pageSizeOptions?.map(size => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                {'<<'}
                            </button>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                {'<'}
                            </button>
                            {Array.from({length: Math.min(5, table.getPageCount())}, (_, i) => {
                                const pageIndex = i;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => table.setPageIndex(pageIndex)}
                                        className={`px-3 py-1 border rounded ${
                                            table.getState().pagination.pageIndex === pageIndex
                                                ? 'bg-blue-500 text-white'
                                                : ''
                                        }`}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                {'>'}
                            </button>
                            <button
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                {'>>'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Row selection info */}
            {enableRowSelection && Object.keys(rowSelection).length > 0 && (
                <div className="text-sm text-gray-600">
                    {Object.keys(rowSelection).length} ta qator tanlandi
                </div>
            )}
        </div>
    );
};

// Helper component: Debounced input for filtering
const DebouncedInput = ({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return (
        <input
            {...props}
            value={value}
            onChange={e => setValue(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
        />
    );
};

// Helper component: Sort icon
const SortIcon = ({direction}: { direction: false | 'asc' | 'desc' }) => {
    if (!direction) return <span>↕️</span>;
    return direction === 'asc' ? <span>⬆️</span> : <span>⬇️</span>;
};

export default TanstackTable;