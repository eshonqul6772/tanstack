import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core';
import { useState } from 'react';

import { useDelete } from '@/entities/user';

interface Props {
  id: string;
  onSuccess: () => void;
}

export const DeleteUserFeature = ({ id, onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const deleteMutation = useDelete();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ id });
      setOpened(false);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <>
      <ActionIcon variant="light" color="red" onClick={() => setOpened(true)}>
        🗑
      </ActionIcon>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Delete User">
        <Text size="sm">Are you sure you want to delete this user?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete} loading={deleteMutation.isPending}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};
