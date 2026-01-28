import type { UseFormReturnType } from '@mantine/form';
import type { IForm } from '../../model/types';
import Text from '@/shared/ui/fields/Text';
import Select from '@/shared/ui/fields/Select';
import { FormProvider } from '@/shared/ui/fields';
import { Button } from '@mantine/core';
import { STATUS } from '@/shared/lib/utils/enums';

interface Props {
  form: UseFormReturnType<IForm.Values>;
  onSubmit: (values: IForm.Values) => void;
  loading?: boolean;
}

export const UserForm = ({ form, onSubmit, loading }: Props) => {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <FormProvider form={form}>
        <div className="grid grid-cols-2 gap-4">
          <Text name="firstName" label="First Name" />
          <Text name="lastName" label="Last Name" />
          <Text name="username" label="Username" />
          <Text name="password" label="Password" type="password" />
          <Select
            name="status"
            label="Status"
            data={[
              { value: STATUS.ACTIVE, label: 'Active' },
              { value: STATUS.INACTIVE, label: 'Inactive' }
            ]}
          />
          {/* photoId and roleId should be added here, but they might need separate fetchers */}
        </div>
      </FormProvider>
      <Button type="submit" loading={loading} mt="md">
        Save
      </Button>
    </form>
  );
};
