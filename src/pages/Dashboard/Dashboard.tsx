import React from 'react';

import { useTranslation } from 'react-i18next';



const Dashboard:React.FC = () => {
  const { t } = useTranslation();

  return <div>{t('dashboard')}</div>;
};

export default Dashboard;
