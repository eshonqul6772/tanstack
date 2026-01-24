import '@/shared/assets/style/main.scss';

import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { http } from '@/shared/api';
import { setAuthHandlers } from '@/shared/api/http';
import config from '@/shared/config';
import * as i18n from '@/shared/lib/i18n';
import storage from '@/shared/lib/storage';

const HttpInitializer = () => {
  const auth = useAuth();

  React.useEffect(() => {
    if (config.app.isDev) {
      console.log('%cADMIN DEVELOPMENT MODE', 'color: red; font-size: 32px;');
    } else {
      console.log('%cADMIN PRODUCTION MODE', 'color: red; font-size: 32px;');
    }

    i18n.init({
      languages: config.language.list,
      currentLanguage: storage.local.get(config.language.key),
      initialLanguage: config.language.initial,
      backend: {
        loadPath: `${config.api.baseUrl}/reference/translations/ADMIN_CABINET`
      },
      onChange: language => storage.local.set('language', language)
    });

    setAuthHandlers({
      getToken: () => auth.token,
      onLogout: () => auth.methods.logout()
    });

    http.init({
      config: {
        baseURL: 'https://hudud.adliya.uz/api/v1',
        timeout: 15000
      }
    });
  }, [auth]);

  return null;
};

export default HttpInitializer;
