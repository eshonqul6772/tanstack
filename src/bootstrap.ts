import "@/assets/style/main.scss";

import config from '@/config';
import { useAuth } from '@/modules/auth/hooks';
import {http, i18n, storage} from '@/services';

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
        loadPath: `${config.api.baseUrl}/reference/translations/ADMIN_CABINET`,
    },
    onChange: language => storage.local.set('language', language),
});

http.init({
    config: {
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 15000,
    },
    configFn: (config) => {
        const { token } = useAuth();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
});