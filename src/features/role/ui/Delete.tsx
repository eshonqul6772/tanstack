import type React from 'react';
import { Button, Group, Loader, Text } from '@mantine/core';

import { useDelete } from '@/entities/role';

interface IProps {
  id: number | null;
  onCancel: () => void;
}

export const Delete: React.FC<IProps> = ({ id, onCancel }) => {
  const { isPending, mutate } = useDelete();

  const Confirm = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          onCancel();
        }
      }
    );
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <Text size="sm">Are you sure you want to delete this translation?</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="red" onClick={Confirm} loading={isPending}>
          Delete
        </Button>
      </Group>
    </>
  );
};
