import { EntityCreate } from '@/shared/ui/crud/EntityCreate';
import { EntityDelete } from '@/shared/ui/crud/EntityDelete';
import { EntityUpdate } from '@/shared/ui/crud/EntityUpdate';

import { UserForm, useDelete, useSingle } from '@/entities/user';
import * as Forms from '@/entities/user/forms';
import * as Mappers from '@/entities/user/model/mappers';

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
  <EntityCreate onCancel={onCancel} CreateWrapper={Forms.Create} FormComponent={UserForm} />
);

export const Update = ({ id, onCancel }: UpdateProps) => (
  <EntityUpdate
    id={id}
    onCancel={onCancel}
    useSingle={useSingle}
    UpdateWrapper={Forms.Update}
    FormComponent={UserForm}
    mapValues={Mappers.getFormValues}
  />
);

export const Delete = ({ id, onCancel }: DeleteProps) => (
  <EntityDelete
    id={id}
    onCancel={onCancel}
    useDelete={useDelete}
    confirmText="Are you sure you want to delete this user?"
  />
);
