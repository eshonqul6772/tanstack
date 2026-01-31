import { EntityCreate } from '@/shared/ui/crud/EntityCreate';
import { EntityDelete } from '@/shared/ui/crud/EntityDelete';
import { EntityUpdate } from '@/shared/ui/crud/EntityUpdate';

import { Form, useDelete, useSingle } from '@/entities/role';
import * as Mappers from '@/entities/role/model/mappers';
import * as Forms from '@/entities/role/forms';

interface CreateProps {
  onCancel: () => void;
}

interface UpdateProps {
  id: number;
  onCancel: () => void;
}

interface DeleteProps {
  id: number | null;
  onCancel: () => void;
}

export const Create = ({ onCancel }: CreateProps) => (
  <EntityCreate onCancel={onCancel} CreateWrapper={Forms.Create} FormComponent={Form} />
);

export const Update = ({ id, onCancel }: UpdateProps) => (
  <EntityUpdate
    id={id}
    onCancel={onCancel}
    useSingle={useSingle}
    UpdateWrapper={Forms.Update}
    FormComponent={Form}
    mapValues={Mappers.getFormValues}
  />
);

export const Delete = ({ id, onCancel }: DeleteProps) => (
  <EntityDelete
    id={id}
    onCancel={onCancel}
    useDelete={useDelete}
    confirmText="Are you sure you want to delete this role?"
  />
);
