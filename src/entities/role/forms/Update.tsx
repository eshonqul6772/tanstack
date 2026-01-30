import type React from 'react';
import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import isEqual from 'lodash/isEqual';

import { FormProvider } from '@/shared/ui/fields';

import * as Constants from '@/entities/translation/model/constants.ts';

import * as Api from '../api/api';
import * as Mappers from '../model/mappers';
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
  const queryClient = useQueryClient();

  const form = useForm<IFormValues>({
    initialValues: values,

    validate: {
      name: value => (!value ? 'Required' : null),
      description: value => (!value ? 'Required' : null),
      permissions: value => (!value ? 'Required' : null),
      status: value => (!value ? 'Required' : null)
    }
  });

  const lastValuesRef = useRef<IFormValues | null>(null);

  useEffect(() => {
    if (isEqual(values, lastValuesRef.current)) return;
    lastValuesRef.current = values;
    form.setInitialValues(values);
    form.setValues(values);
    form.resetDirty(values);
  }, [values, form]);

  const mutation = useMutation<Types.IEntity.Data, string, IFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Update({ id, values });
      return Mappers.getData(data.data);
    },
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === Constants.ENTITY && query.queryKey[1] === 'list'
      });
      onSuccess?.(data);
    },
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

export default Update;
