import { Update, Single, type IEntity, type IForm } from '@/entities/user';
import { useForm } from '@mantine/form';
import { Modal, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { UserForm } from '@/entities/user';

interface Props {
  user: IEntity.User;
  onSuccess: (updatedUser: IEntity.User) => void;
}

export const UpdateUserFeature = ({ user, onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IForm.Values>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      status: user.status,
      roleId: user.role?.id as any,
      photoId: user.photo?.id as any
    }
  });

  const handleSubmit = async (values: IForm.Values) => {
    setLoading(true);
    try {
      await Update({ id: user.id, values });
      const { data } = await Single({ id: user.id });
      onSuccess(data.data);
      setOpened(false);
    } catch (error) {
      console.error('Failed to update user', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActionIcon variant="light" color="blue" onClick={() => setOpened(true)}>
        ✏️
      </ActionIcon>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit User">
        <UserForm form={form} onSubmit={handleSubmit} loading={loading} />
      </Modal>
    </>
  );
};
