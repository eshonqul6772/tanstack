import React from 'react';
import { Grid, Button,Loader  } from '@mantine/core';

import {useAuth} from '@/providers/AuthProvider';

import * as Forms from '@/modules/auth/forms';
import * as Actions from '@/modules/auth/actions';
import * as Fields from '@/containers/Fields';

import cls from './Login.module.scss';

const Login: React.FC = () => {
    const {dispatch} = useAuth();

    return (
        <div className={cls.wrapper}>
            <div className={cls.content}>


                <Forms.Login
                    onSuccess={token => {
                        dispatch(Actions.Login.success({token}));
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
                                        'action_login
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
