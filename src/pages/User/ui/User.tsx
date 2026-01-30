import { useTranslation } from 'react-i18next';

import { Create, Delete, Update } from '@/features/user';

import { ListPaging, useList } from '@/entities/user';

import CrudPage from '@/widgets/crud-page';

const UserPage = () => {
  const { t } = useTranslation();

  return (
    <CrudPage
      title="Translations"
      createLabel={t('create_user')}
      deleteTitle={t('user_delete_title')}
      createTitle={t('user_create_title')}
      updateTitle={t('user_update_title')}
      useList={useList}
      ListComponent={ListPaging}
      CreateComponent={Create}
      UpdateComponent={Update}
      DeleteComponent={Delete}
    />
  );
};

export default UserPage;
