import type React from 'react';
import { useRouterState } from '@tanstack/react-router';

import config from '@/shared/config';

import { CreateUserFeature, DeleteUserFeature, UpdateUserFeature } from '@/features/user';

import { type IEntity, UserTable, useList } from '@/entities/user';

import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

const UserPage: React.FC = () => {
  const search = useRouterState({ select: state => state.location.search }) as unknown as Record<string, unknown>;
  const page = Math.max(1, Number(search.page || 1));
  const perPage = Math.max(1, Number(search.perPage || config.list.perPage));

  const pagination: PaginationParams = {
    pageIndex: page - 1,
    pageSize: perPage
  };

  const { items, meta, refetch } = useList({
    params: {
      page,
      perPage
    }
  });

  const handleUpdateSuccess = (_: IEntity.User) => {
    refetch().then((r: any) => r);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <CreateUserFeature onSuccess={() => refetch().then((r: any) => r)} />
      </div>

      <UserTable
        data={items}
        pagination={pagination}
        rowCount={meta.totalItems}
        actions={user => (
          <>
            <UpdateUserFeature id={user.id} onSuccess={handleUpdateSuccess} />
            <DeleteUserFeature id={user.id} onSuccess={() => refetch().then((r: any) => r)} />
          </>
        )}
      />
    </div>
  );
};

export default UserPage;
