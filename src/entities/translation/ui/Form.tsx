import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Group } from '@mantine/core';

import { STATUS } from '@/shared/lib/utils/enums.ts';
import * as Fields from '@/shared/ui/fields';

export const Form = ({ onCancel }: { onCancel: () => void }) => {
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState('uz');

  return (
    <Grid gutter="md">
      <Grid.Col span={12}>
        <Fields.LanguageSwitcher
          fields={['name']}
          onChange={value => setActiveLanguage(value)}
          active={activeLanguage}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Fields.Text name={`name.${activeLanguage}`} label={t(`translation_name_${activeLanguage}`)} />
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
