import { Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Create, Form, type IForm } from '@/entities/translation';
import { STATUS } from '@/shared/lib/utils/enums';

interface Props {
  onSuccess: () => void;
}

export const CreateTranslation = ({ onSuccess }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IForm.Values>({
    initialValues: {
      name: '',
      tag: '',
      types: '',
      status: STATUS.ACTIVE
    }
  });

  const handleSubmit = async (values: IForm.Values) => {
    setLoading(true);
    try {
      await Create({ values });
      setOpened(false);
      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to create translation', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Add Translation</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Create Translation">
        <Form form={form} onSubmit={handleSubmit} loading={loading} />
      </Modal>
    </>
  );
};
