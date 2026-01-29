import { useState } from 'react';
import { Button, Loader, Modal } from '@mantine/core';

import { UserForm } from '@/entities/user';
import * as Forms from '@/entities/user/forms';

interface Props {
  onSuccess: () => void;
}

export const CreateUserFeature = ({ onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Add User</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add User">
        <Forms.Create
          onSuccess={() => {
            setOpened(false);
            onSuccess();
          }}
        >
          {form => (
            <>
              {form.submitting && <Loader color="blue" size="sm" />}
              <UserForm />
            </>
          )}
        </Forms.Create>
      </Modal>
    </>
  );
};
