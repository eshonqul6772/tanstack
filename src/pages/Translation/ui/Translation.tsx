import { useTranslation } from 'react-i18next';

import { Create, Delete, Update } from '@/features/translation';

import { ListPaging, useList } from '@/entities/translation';

import CrudPage from '@/widgets/crud-page';

const TranslationPage = () => {
  const { t } = useTranslation();

  return (
    <CrudPage
      title="Translations"
      createLabel={t('create_translation')}
      deleteTitle={t('translation_delete_title')}
      createTitle={t('translation_create_title')}
      updateTitle={t('translation_update_title')}
      useList={useList}
      ListComponent={ListPaging}
      CreateComponent={Create}
      UpdateComponent={Update}
      DeleteComponent={Delete}
    />
  );
};

export default TranslationPage;
