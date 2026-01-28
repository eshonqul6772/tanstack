import { useRouterState } from '@tanstack/react-router';
import type React from 'react';
import { type IEntity, List, useList } from '@/entities/translation';
import { CreateTranslation, DeleteTranslation, UpdateTranslation } from '@/features/translation-management';
import config from '@/shared/config';
import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

const TranslationPage: React.FC = () => {
  const search = useRouterState({ select: state => state.location.search }) as unknown as Record<string, unknown>;

  const page = Math.max(1, Number(search.page || 1));
  const perPage = Math.max(1, Number(search.perPage || config.list.perPage));
  const sortParam = typeof search.sort === 'string' ? search.sort : '';

  const pagination: PaginationParams = {
    pageIndex: page - 1,
    pageSize: perPage
  };

  const sort = sortParam
    ? {
        name: sortParam.startsWith('-') ? sortParam.slice(1) : sortParam,
        direction: sortParam.startsWith('-') ? 'desc' : 'asc'
      }
    : undefined;

  const { items, meta, refetch } = useList({
    params: {
      page,
      perPage,
      sort
    }
  });

  const handleUpdateSuccess = (_: IEntity.Data) => {
    refetch().then((r: any) => r);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Translations</h1>
        <CreateTranslation onSuccess={() => refetch().then((r: any) => r)} />
      </div>

      <List
        data={items}
        pagination={pagination}
        rowCount={meta.totalItems}
        renderActions={translation => (
          <>
            <UpdateTranslation translation={translation} onSuccess={handleUpdateSuccess} />
            <DeleteTranslation id={translation.id} onSuccess={() => refetch().then((r: any) => r)} />
          </>
        )}
      />
    </div>
  );
};

export default TranslationPage;
