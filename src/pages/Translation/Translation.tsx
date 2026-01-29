import type React from 'react';
import { useState } from 'react';
import { ActionIcon, Button, Modal } from '@mantine/core';
import { useRouterState } from '@tanstack/react-router';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import config from '@/shared/config';

import { Create, Delete, Update } from '@/features/translation';

import { ListPaging, useList } from '@/entities/translation';

import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

interface IModal {
  id: number | null;
  mode: 'DEFAULT' | 'CREATE' | 'UPDATE' | 'DELETE';
}

const initialValue: IModal = {
  id: null,
  mode: 'DEFAULT'
};

const TranslationPage: React.FC = () => {
  const { t } = useTranslation();
  const search = useRouterState({ select: state => state.location.search }) as unknown as Record<string, unknown>;

  const [modal, setModal] = useState<IModal>(initialValue);

  const page = Math.max(1, Number(search.page || 1));
  const perPage = Math.max(1, Number(search.perPage || config.list.perPage));

  const pagination: PaginationParams = {
    pageIndex: page - 1,
    pageSize: perPage
  };

  const { items, meta } = useList({
    params: {
      page,
      perPage
    }
  });

  const onCancel = () => {
    setModal(initialValue);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Translations</h1>
        <Button onClick={() => setModal({ id: null, mode: 'CREATE' })}>{t('create_translation')}</Button>
      </div>

      <ListPaging
        data={items}
        pagination={pagination}
        rowCount={meta.totalItems}
        renderActions={item => (
          <>
            <ActionIcon variant="light" color="red" onClick={() => setModal({ id: item.id, mode: 'DELETE' })}>
              <Trash2 />
            </ActionIcon>
            <ActionIcon variant="light" color="blue" onClick={() => setModal({ id: item.id, mode: 'UPDATE' })}>
              <Pencil />
            </ActionIcon>
          </>
        )}
      />

      <Modal onClose={() => setModal(initialValue)} title="Delete Translation" opened={modal.mode === 'DELETE'}>
        <Delete id={modal.id} onCancel={() => setModal(initialValue)} />
      </Modal>

      <Modal
        onClose={() => setModal(initialValue)}
        title={modal.mode === 'CREATE' ? t('translation_create_title') : t('translation_update_title')}
        opened={modal.mode === 'CREATE' || modal.mode === 'UPDATE'}
      >
        {/** biome-ignore lint/style/noNonNullAssertion: <explanation> */}
        {modal.mode === 'CREATE' ? <Create onCancel={onCancel} /> : <Update id={modal.id!} onCancel={onCancel} />}
      </Modal>
    </div>
  );
};

export default TranslationPage;
