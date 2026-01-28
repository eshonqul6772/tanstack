import '@/shared/assets/style/main.scss';

import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { http } from '@/shared/api';
import { setAuthHandlers } from '@/shared/api/http';
import config from '@/shared/config';
import * as i18n from '@/shared/lib/i18n';
import storage from '@/shared/lib/storage';

let initialized = false;

const HttpInitializer = () => {
  const auth = useAuth();
  const authRef = React.useRef(auth);

  React.useEffect(() => {
    authRef.current = auth;
  }, [auth]);

  React.useEffect(() => {
    if (initialized) return;
    initialized = true;

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
        loadPath: `http://localhost:4445/api/v1/references/translations/ADMIN_CABINET/uz`
      },
      onChange: language => storage.local.set('language', language)
    });

    setAuthHandlers({
      getToken: () => auth.token,
      onLogout: () => auth.methods.logout()
    });

    http.init({
      baseURL: config.api.baseUrl
    });
  }, [auth]);

  return null;
};

export default HttpInitializer;
