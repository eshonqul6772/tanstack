import { Create, type IForm } from '@/entities/user';
import { useForm } from '@mantine/form';
import { STATUS } from '@/shared/lib/utils/enums';
import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { UserForm } from '@/entities/user';

interface Props {
  onSuccess: () => void;
}

export const CreateUserFeature = ({ onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IForm.Values>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      status: STATUS.ACTIVE,
      roleId: null,
      photoId: null
    }
  });

  const handleSubmit = async (values: IForm.Values) => {
    setLoading(true);
    try {
      await Create({ values });
      onSuccess();
      setOpened(false);
      form.reset();
    } catch (error) {
      console.error('Failed to create user', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Add User</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add User">
        <UserForm form={form} onSubmit={handleSubmit} loading={loading} />
      </Modal>
    </>
  );
};
