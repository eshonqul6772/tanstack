import type React from 'react';
import { Button, Container, Loader, Paper, Stack, Text, Title } from '@mantine/core';

import storage from '@/shared/lib/storage';
import * as Fields from '@/shared/ui/fields';

import { useAuth } from '@/features/auth/model/AuthContext';
import * as Actions from '@/features/auth/model/actions';
import * as Forms from '@/features/auth/ui';

import cls from './Login.module.scss';

const Login: React.FC = () => {
  const { dispatch } = useAuth();

  return (
    <div className={cls.wrapper}>
      <Container size={1400} className={cls.container}>
        <div className={cls.contentWrapper}>
          <Paper radius="lg" p={60} className={cls.formCard}>
            <Stack gap={32} align="stretch">
              <Stack gap={8}>
                <Title order={1} size="h2" fw={600} ta="left">
                  Welcome back!
                </Title>
                <Text size="sm" c="gray" ta="left">
                  Please enter your credentials to sign in!
                </Text>
              </Stack>

              <Forms.Login
                onSuccess={token => {
                  storage.local.set('auth_token', token.accessToken);
                  dispatch(Actions.Login.success({ token }));
                }}
              >
                {form => (
                  <Stack gap={16}>
                    {form.submitting && (
                      <div className={cls.loaderContainer}>
                        <Loader color="blue" size="sm" />
                      </div>
                    )}

                    <Stack gap={4}>
                      <Fields.Text name="username" form={form} validation={{ required: true }} />
                    </Stack>

                    <Stack gap={4}>
                      <Fields.Text name="password" type={'password'} validation={{ required: true }} form={form} />
                    </Stack>

                    <Button
                      type="submit"
                      disabled={form.submitting}
                      fullWidth
                      size="md"
                      radius="md"
                      bg="#1971C2"
                      fw={600}
                      className={cls.signInBtn}
                    >
                      {form.submitting ? <Loader size="xs" color="white" /> : 'Sign In'}
                    </Button>
                  </Stack>
                )}
              </Forms.Login>
            </Stack>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Login;
