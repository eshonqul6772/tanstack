import React, { useState, useEffect } from 'react';
import { UserTable, List, type IEntity } from '@/entities/user';
import { CreateUserFeature, UpdateUserFeature, DeleteUserFeature } from '@/features/user-management';
import type { SortingState } from '@/shared/ui/table/Table';
import type { Filters, PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

const UserPage: React.FC = () => {
  const [data, setData] = useState<IEntity.User[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [_, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState<SortingState[]>([]);
  const [filters, setFilters] = useState<Filters<IEntity.User>>({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await List({
        params: {
          page: pagination.pageIndex,
          perPage: pagination.pageSize,
          sort:
            sorting.length > 0
              ? {
                  name: sorting[0].id,
                  direction: sorting[0].desc ? 'desc' : 'asc'
                }
              : undefined,
          filter: Object.entries(filters).map(([key, value]) => ({
            key,
            value: value as string,
            operation: '%_%',
            type: 'STRING'
          }))
        }
      });
      setData(response.data.data);
      setRowCount(response.data.meta.totalItems);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination, sorting, filters]);

  const handleUpdateSuccess = (updatedUser: IEntity.User) => {
    setData(prev => prev.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <CreateUserFeature onSuccess={fetchData} />
      </div>

      <UserTable
        data={data}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        filters={filters}
        onFilterChange={newFilters => setFilters(prev => ({ ...prev, ...newFilters }))}
        sorting={sorting}
        onSortingChange={setSorting}
        renderActions={user => (
          <>
            <UpdateUserFeature user={user} onSuccess={handleUpdateSuccess} />
            <DeleteUserFeature id={user.id} onSuccess={fetchData} />
          </>
        )}
      />
    </div>
  );
};

export default UserPage;
