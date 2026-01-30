import type React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

import { STATUS } from '@/shared/lib/utils/enums';
import { FormProvider } from '@/shared/ui/fields';

import * as Api from '../api/api';
import type * as Types from '../model/types';

export type IFormValues = Types.IForm.Values;

interface IProps {
  onSuccess?: (data: Types.IEntity.User) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<IFormValues>>): React.JSX.Element;
}

const Create: React.FC<IProps> = ({ onSuccess, onError, children }) => {
  const form = useForm<IFormValues>({
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

  const mutation = useMutation<Types.IEntity.User, string, IFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Create({ values });
      return data.data;
    },
    onSuccess,
    onError
  });

  const handleSubmit = form.onSubmit(values => {
    mutation.mutate(values, {
      onSettled: () => form.setSubmitting(false)
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormProvider form={form}>{children(form)}</FormProvider>
    </form>
  );
};

export default Create;
