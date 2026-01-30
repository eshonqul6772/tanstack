import { useTranslation } from 'react-i18next';
import { Button, Grid, Group } from '@mantine/core';

import { STATUS } from '@/shared/lib/utils/enums.ts';
import * as Fields from '@/shared/ui/fields';

import { usePermission } from '@/entities/role';

export const Form = ({ onCancel }: { onCancel: () => void }) => {
  const { t } = useTranslation();

  const { items } = usePermission();

  return (
    <Grid gutter="md">
      <Grid.Col span={6}>
        <Fields.Text name="name" label={t('field_name')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.Text name="description" label={t('field_description')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.MultiSelect
          name="permissions"
          label={t('field_permissions')}
          data={items.map(item => ({ value: item.key, label: item.name }))}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.Select
          name="status"
          label={t('field_status')}
          data={[
            { value: STATUS.ACTIVE, label: t('translation_status_active') },
            { value: STATUS.INACTIVE, label: t('translation_status_inactive') }
          ]}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Group justify="flex-end">
          <Button onClick={onCancel} type="submit" mt="md" color="red" size="sm">
            {t('action_cancel')}
          </Button>
          <Button type="submit" mt="md" size="sn">
            {t('action_save')}
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};
