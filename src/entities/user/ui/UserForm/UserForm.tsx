import { Button } from '@mantine/core';
import { STATUS } from '@/shared/lib/utils/enums';
import Text from '@/shared/ui/fields/Text';
import Select from '@/shared/ui/fields/Select';

export const UserForm = () => (
  <>
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
    <Button type="submit" mt="md">
      Save
    </Button>
  </>
);
