import type React from 'react';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

import { FormProvider } from '@/shared/ui/fields';

import * as Api from '../api/api';
import type * as Types from '../model/types';

export type IFormValues = Types.IForm.Values;

interface IProps {
  id: number;
  values: Types.IForm.Values;
  onSuccess?: (data: Types.IEntity.Data) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<IFormValues>>): React.JSX.Element;
}

const Update: React.FC<IProps> = ({ id, values, onSuccess, onError, children }) => {
  const form = useForm<IFormValues>({
    initialValues: values,

    validate: {
      firstName: value => (!value ? 'Required' : null),
      lastName: value => (!value ? 'Required' : null),
      username: value => (!value ? 'Required' : null),
      password: value => (!value ? 'Required' : null),
      phone: value => (!value ? 'Required' : null),
      status: value => (!value ? 'Required' : null),
      roleId: value => (!value ? 'Required' : null),
      photoId: value => (!value ? 'Required' : null)
    }
  });

  useEffect(() => {
    form.setInitialValues(values);
    form.setValues(values);
    form.resetDirty(values);
  }, [values, form]);

  const mutation = useMutation<Types.IEntity.Data, string, IFormValues>({
    mutationFn: async payload => {
      const { data } = await Api.Update({ id, values: payload });
      return data.data;
    },
    onSuccess,
    onError
  });

  const handleSubmit = form.onSubmit(payload => {
    mutation.mutate(payload, {
      onSettled: () => form.setSubmitting(false)
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormProvider form={form}>{children(form)}</FormProvider>
    </form>
  );
};

export default Update;
