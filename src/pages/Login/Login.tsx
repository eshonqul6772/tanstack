import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import message from 'antd/lib/message';

import * as Forms from '@/modules/auth/forms';
import * as Actions from '@/modules/auth/actions';

import * as Fields from '@/containers/Fields';

import cls from './Login.module.scss';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className={cls.wrapper}>
      <div className={cls.content}>
        <div className={cls.info}>
          <div className={cls.name}>{t('admin_panel')}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
