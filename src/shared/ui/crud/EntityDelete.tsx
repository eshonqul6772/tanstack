import type { ComponentType } from 'react';
import { Button, Group, Loader, Text } from '@mantine/core';

interface DeleteMutationOptions {
  onSuccess: () => void;
}

interface DeleteHookResult {
  isPending: boolean;
  mutate: (values: { id: number | null }, options: DeleteMutationOptions) => void;
}

interface Props {
  id: number | null;
  onCancel: () => void;
  useDelete: () => DeleteHookResult;
  confirmText: string;
  ActionsComponent?: ComponentType<{ onCancel: () => void; onConfirm: () => void; isPending: boolean }>;
}

export const EntityDelete = ({ id, onCancel, useDelete, confirmText, ActionsComponent }: Props) => {
  const { isPending, mutate } = useDelete();

  const handleConfirm = () => {
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

  if (ActionsComponent) {
    return (
      <>
        <Text size="sm">{confirmText}</Text>
        <ActionsComponent onCancel={onCancel} onConfirm={handleConfirm} isPending={isPending} />
      </>
    );
  }

  return (
    <>
      <Text size="sm">{confirmText}</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="red" onClick={handleConfirm} loading={isPending}>
          Delete
        </Button>
      </Group>
    </>
  );
};
