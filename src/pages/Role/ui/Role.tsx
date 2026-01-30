import { useTranslation } from 'react-i18next';

import { Create, Delete, Update } from '@/features/role';

import { ListPaging, useList } from '@/entities/role';

import CrudPage from '@/widgets/crud-page';

const RolePage = () => {
  const { t } = useTranslation();

  return (
    <CrudPage
      title="Roles"
      createLabel={t('create_role')}
      deleteTitle={t('role_delete_title')}
      createTitle={t('role_create_title')}
      updateTitle={t('role_update_title')}
      useList={useList}
      ListComponent={ListPaging}
      CreateComponent={Create}
      UpdateComponent={Update}
      DeleteComponent={Delete}
    />
  );
};

export default RolePage;
