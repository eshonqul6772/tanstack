import { Button, Grid } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { STATUS } from '@/shared/lib/utils/enums.ts';
import * as Fields from '@/shared/ui/fields';

export const Form = () => {
  const { t } = useTranslation();

  return (
    <Grid gutter="md">
      <Grid.Col span={6}>
        <Fields.Text name="name" label={t('translation_name')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.Text name="tag" label={t('translation_tag')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.Text name="types" label={t('translation_types')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.Select
          name="status"
          label={t('translation_status')}
          data={[
            { value: STATUS.ACTIVE, label: t('translation_status_active') },
            { value: STATUS.INACTIVE, label: t('translation_status_inactive') }
          ]}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <Button type="submit" mt="md">
          {t('action_save')}
        </Button>
        <Button type="submit" mt="md">
          {t('action_cancel')}
        </Button>
      </Grid.Col>
    </Grid>
  );
};
