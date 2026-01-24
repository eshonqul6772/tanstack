import {Button} from '@mantine/core';
import {useTranslation} from 'react-i18next';

import NoAccessSvg from '@/shared/assets/images/no-access.svg';

import classes from './NoAccess.module.scss';

import { useAuth } from '@/features/auth/hooks';

const NoAccess = () => {
    const {t} = useTranslation();
    const {methods} = useAuth();

    return (
        <div className={classes.wrapper}>
            <div>
                <img src={NoAccessSvg} alt="access_denied"/>
            </div>
            <div className={classes.container}>
                <h1>{t('no_access_desc')}</h1>
                <Button
                    variant="alt"
                    title={t('back_to_login')}
                    onClick={() => methods.logout()}
                />
            </div>
        </div>
    );
};

export default NoAccess;
