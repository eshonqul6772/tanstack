import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { Button, Modal, Space } from '@mantine/core';
import { Pencil, Trash2 } from 'lucide-react';

import config from '@/shared/config';
import type { IMeta } from '@/shared/lib/utils/interfaces';
import Pagination from '@/shared/ui/Pagination';
import type { ListTableProps } from '@/shared/ui/table/types';

import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

type ModalMode = 'DEFAULT' | 'CREATE' | 'UPDATE' | 'DELETE';

interface ModalState {
  id: number | null;
  mode: ModalMode;
}

interface ActionHandlers {
  openDelete: (id: number) => void;
  openUpdate: (id: number) => void;
}

interface Props<T extends { id: number }> {
  title: string;
  createLabel: string;
  deleteTitle: string;
  createTitle: string;
  updateTitle: string;
  useList: (args: { params: { page: number; perPage: number } }) => { items: T[]; meta: IMeta };
  ListComponent: ComponentType<ListTableProps<T>>;
  CreateComponent: ComponentType<{ onCancel: () => void }>;
  UpdateComponent: ComponentType<{ id: number; onCancel: () => void }>;
  DeleteComponent: ComponentType<{ id: number | null; onCancel: () => void }>;
  renderActions?: (item: T, handlers: ActionHandlers) => ReactNode;
}

const initialValue: ModalState = {
  id: null,
  mode: 'DEFAULT'
};

const CrudPage = <T extends { id: number }>({
  title,
  createLabel,
  deleteTitle,
  createTitle,
  updateTitle,
  useList,
  ListComponent,
  CreateComponent,
  UpdateComponent,
  DeleteComponent,
  renderActions
}: Props<T>) => {
  const search = useRouterState({ select: state => state.location.search }) as unknown as Record<string, unknown>;

  const [modal, setModal] = useState<ModalState>(initialValue);

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

  const closeModal = () => {
    setModal(initialValue);
  };

  const openCreate = () => setModal({ id: null, mode: 'CREATE' });
  const openUpdate = (id: number) => setModal({ id, mode: 'UPDATE' });
  const openDelete = (id: number) => setModal({ id, mode: 'DELETE' });

  const defaultActions = (item: T) => (
    <>
      <Trash2 onClick={() => openDelete(item.id)} />
      <Pencil onClick={() => openUpdate(item.id)} />
    </>
  );

  const actions = (item: T) => (renderActions ? renderActions(item, { openDelete, openUpdate }) : defaultActions(item));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={openCreate}>{createLabel}</Button>
      </div>

      <ListComponent data={items} pagination={pagination} rowCount={meta.totalItems} actions={actions} />

      <Space h="md" />

      <Pagination total={meta.totalItems} current={meta.current} pageSize={meta.perPage} />

      <Modal onClose={closeModal} title={deleteTitle} opened={modal.mode === 'DELETE'}>
        <DeleteComponent id={modal.id} onCancel={closeModal} />
      </Modal>

      <Modal
        size="50%"
        onClose={closeModal}
        title={modal.mode === 'CREATE' ? createTitle : updateTitle}
        opened={modal.mode === 'CREATE' || modal.mode === 'UPDATE'}
      >
        {modal.mode === 'CREATE' && <CreateComponent onCancel={closeModal} />}
        {modal.mode === 'UPDATE' && modal.id != null && <UpdateComponent id={modal.id} onCancel={closeModal} />}
      </Modal>
    </div>
  );
};

export default CrudPage;
