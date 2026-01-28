import { ActionIcon, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Form, type IEntity, type IForm, Single, Update } from '@/entities/translation';

interface Props {
  translation: IEntity.Data;
  onSuccess: (updatedTranslation: IEntity.Data) => void;
}

export const UpdateTranslation = ({ translation, onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IForm.Values>({
    initialValues: {
      name: translation.name,
      tag: translation.tag,
      types: translation.types,
      status: translation.status
    }
  });

  const handleSubmit = async (values: IForm.Values) => {
    setLoading(true);
    try {
      await Update({ id: translation.id, values });
      const response = await Single({ id: translation.id });
      setOpened(false);
      onSuccess(response.data.data);
    } catch (error) {
      console.error('Failed to update translation', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActionIcon variant="light" color="blue" onClick={() => setOpened(true)}>
        ✏️
      </ActionIcon>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Update Translation">
        <Form form={form} onSubmit={handleSubmit} loading={loading} />
      </Modal>
    </>
  );
};
