import { useTranslation } from 'react-i18next';
import { Button, Grid, Group } from '@mantine/core';

import { STATUS } from '@/shared/lib/utils/enums.ts';
import Select from '@/shared/ui/fields/Select.tsx';
import Text from '@/shared/ui/fields/Text.tsx';

import { useSelect } from '@/entities/role';

export const UserForm = ({ onCancel }: { onCancel: () => void }) => {
  const { t } = useTranslation();
  const { items } = useSelect();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Text name="firstName" label={t('first_name')} />
      <Text name="lastName" label={t('last_name')} />
      <Text name="username" label={t('username')} />
      <Text name="phone" label={t('phone')} />
      <Text name="photoId" label={t('photo_id')} />
      <Text name="password" label={t('password')} type="password" />
      <Select
        name="roleId"
        data={items.map(item => ({ value: String(item.id), label: item.name }))}
        label={t('role')}
      />
      <Select
        name="status"
        label="Status"
        data={[
          { value: STATUS.ACTIVE, label: t('status_active') },
          { value: STATUS.INACTIVE, label: t('status_inactive') }
        ]}
      />
      <Grid gutter="md" className="mt-4">
        <Grid.Col span={12}>
          <Group justify="flex-end">
            <Button onClick={onCancel} type="button" mt="md" color="red" size="sm">
              {t('action_cancel')}
            </Button>
            <Button type="submit" mt="md" size="sm">
              {t('action_save')}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};
