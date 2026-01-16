import "@/assets/style/main.scss";

import config from '@/config';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import {http, i18n, storage} from '@/services';
import {setAuthStore} from '@/services/http';
import React from "react";


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
                loadPath: `${config.api.baseUrl}/reference/translations/ADMIN_CABINET`,
            },
            onChange: language => storage.local.set('language', language),
        });


        setAuthStore(auth);

        http.init({
            config: {
                baseURL: 'https://hudud.adliya.uz/api/v1',
                timeout: 15000,
            },

        });
    }, [auth]);

    return null;
};

export default HttpInitializer;