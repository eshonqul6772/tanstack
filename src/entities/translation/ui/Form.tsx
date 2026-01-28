import { Button } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

import { STATUS } from '@/shared/lib/utils/enums.ts';
import * as Fields from '@/shared/ui/fields';

import type { IForm } from '../model/types.ts';

interface Props {
  form: UseFormReturnType<IForm.Values>;
  onSubmit: (values: IForm.Values) => void;
  loading?: boolean;
}

export const Form = ({ form, onSubmit, loading }: Props) => {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Fields.FormProvider form={form}>
        <div className="grid grid-cols-2 gap-4">
          <Fields.Text name="name" label="Name" />
          <Fields.Text name="tag" label="Tag" />
          <Fields.Text name="types" label="Types" />
          <Fields.Select
            name="status"
            label="Status"
            data={[
              { value: STATUS.ACTIVE, label: 'Active' },
              { value: STATUS.INACTIVE, label: 'Inactive' }
            ]}
          />
        </div>
      </Fields.FormProvider>
      <Button type="submit" loading={loading} mt="md">
        Save
      </Button>
    </form>
  );
};
