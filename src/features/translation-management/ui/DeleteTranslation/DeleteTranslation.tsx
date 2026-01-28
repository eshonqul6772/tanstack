import { useState } from 'react';
import { ActionIcon, Modal, Button, Group, Text } from '@mantine/core';
import { Delete } from '@/entities/translation';

interface Props {
  id: string;
  onSuccess: () => void;
}

export const DeleteTranslation = ({ id, onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await Delete({ id });
      setOpened(false);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete translation', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActionIcon variant="light" color="red" onClick={() => setOpened(true)}>
        🗑️
      </ActionIcon>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Delete Translation">
        <Text size="sm">Are you sure you want to delete this translation?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete} loading={loading}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};
