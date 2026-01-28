import { Delete } from '@/entities/user';
import { ActionIcon } from '@mantine/core';
import { useState } from 'react';

interface Props {
  id: string;
  onSuccess: () => void;
}

export const DeleteUserFeature = ({ id, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      try {
        await Delete({ id });
        onSuccess();
      } catch (error) {
        console.error('Failed to delete user', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ActionIcon variant="light" color="red" onClick={handleDelete} loading={loading}>
      🗑
    </ActionIcon>
  );
};
