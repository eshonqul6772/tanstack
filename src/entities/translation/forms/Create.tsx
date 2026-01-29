import type React from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';

import { CABINET_TYPE, STATUS } from '@/shared/lib/utils/enums.ts';
import { FormProvider } from '@/shared/ui/fields';

import * as Api from '../api/api';
import * as Mappers from '../model/mappers';
import type * as Types from '../model/types';

export type IFormValues = Types.IForm.Values;

interface IProps {
  onSuccess?: (data: Types.IEntity.Data) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<IFormValues>>): React.JSX.Element;
}

const Create: React.FC<IProps> = ({ onSuccess, onError, children }) => {
  const form = useForm<IFormValues>({
    initialValues: {
      name: {
        en: '',
        uz: '',
        ru: ''
      },
      tag: '',
      types: [CABINET_TYPE.ADMIN_CABINET],
      status: STATUS.ACTIVE
    },

    validate: {
      name: {
        en: value => (!value ? 'Required' : null),
        uz: value => (!value ? 'Required' : null),
        ru: value => (!value ? 'Required' : null)
      },
      tag: value => (!value ? 'Required' : null),
      types: value => (!value ? 'Required' : null),
      status: value => (!value ? 'Required' : null)
    }
  });

  const mutation = useMutation<Types.IEntity.Data, string, IFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Create({ values });
      return Mappers.getData(data.data);
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
