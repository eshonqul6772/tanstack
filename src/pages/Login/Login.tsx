import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from '@tanstack/react-router';
import { Grid, Button,Loader  } from '@mantine/core';

import {useAuth} from '@/providers/AuthProvider';

import * as Forms from '@/modules/auth/forms';
import * as Actions from '@/modules/auth/actions';
import * as Fields from '@/containers/Fields';

import cls from './Login.module.scss';

const Login: React.FC = () => {
    const {t} = useTranslation();
    const {dispatch} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={cls.wrapper}>
            <div className={cls.content}>
                <div className={cls.info}>
                    <div className={cls.name}>{t('admin_panel')}</div>
                </div>

                <Forms.Login
                    onSuccess={token => {
                        console.log(t('successfully_login'));
                        dispatch(Actions.Login.success({token}));
                        navigate({
                            to: '/',
                        }).then(r => r);
                    }}
                >
                    {form => (
                        <>
                            {form.submitting && <Loader color="blue" />}

                            <Grid  gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                                <Grid.Col span={12}>
                                        <Fields.Text
                                            name="username"
                                            form={form}
                                            validation={{required: true}}
                                        />
                                </Grid.Col>

                                <Grid.Col span={12}>
                                        <Fields.Text
                                            name="password"
                                            type={'password'}
                                            validation={{required: true}}
                                            form={form}
                                        />
                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <Button
                                        disabled={form.submitting}
                                        type="submit"
                                        color="primary"
                                        variant="solid"
                                        size="large"
                                    >
                                        {t('action_login')}
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </>
                    )}
                </Forms.Login>
            </div>
        </div>
    );
};

export default Login;
