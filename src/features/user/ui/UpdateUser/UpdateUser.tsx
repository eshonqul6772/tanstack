import { useState } from 'react';
import { ActionIcon, Loader, Modal } from '@mantine/core';

import { type IEntity, type IForm, UserForm, useSingle } from '@/entities/user';
import * as Forms from '@/entities/user/forms';

interface Props {
  id: string;
  onSuccess: (updatedUser: IEntity.User) => void;
}

export const UpdateUserFeature = ({ id, onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const { item, isFetching } = useSingle({ id });
  const values: IForm.Values | null = item
    ? {
        firstName: item.firstName,
        lastName: item.lastName,
        username: item.username,
        status: item.status,
        roleId: item.role?.id ?? null,
        photoId: item.photo?.id ?? null
      }
    : null;

  return (
    <>
      <ActionIcon variant="light" color="blue" onClick={() => setOpened(true)}>
        ✏️
      </ActionIcon>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit User">
        {isFetching && <Loader color="blue" size="sm" />}
        {values && (
          <Forms.Update
            id={id}
            values={values}
            onSuccess={data => {
              setOpened(false);
              onSuccess(data);
            }}
          >
            {form => (
              <>
                {form.submitting && <Loader color="blue" size="sm" />}
                <UserForm />
              </>
            )}
          </Forms.Update>
        )}
      </Modal>
    </>
  );
};
