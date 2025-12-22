import React from 'react';

import { useTranslation } from 'react-i18next';



const NotFound:React.FC = () => {
  const { t } = useTranslation();

  return <div>{t('dashboard')}</div>;
};

export default NotFound;
