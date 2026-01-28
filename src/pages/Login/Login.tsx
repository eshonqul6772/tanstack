import type React from 'react';
import { Anchor, Button, Container, Divider, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';

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
              <div className={cls.logoContainer}>
                <div className={cls.logo}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>App logo</title>
                    <path d="M20 2L28 8V20L20 26L12 20V8L20 2Z" fill="#1971C2" />
                  </svg>
                </div>
              </div>

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

                    <Group justify="flex-end" mb={8}>
                      <Anchor component="button" type="button" size="sm" c="#1971C2" fw={500}>
                        Forgot password
                      </Anchor>
                    </Group>

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

                    <Group my={12}>
                      <Divider style={{ flex: 1 }} />
                      <Text size="sm" c="gray" fw={500}>
                        or continue with
                      </Text>
                      <Divider style={{ flex: 1 }} />
                    </Group>

                    <Group grow>
                      <Button variant="light" radius="md" size="md" fw={500} c="dark">
                        Google
                      </Button>
                      <Button variant="light" radius="md" size="md" fw={500} c="dark">
                        Github
                      </Button>
                    </Group>

                    <Group justify="center" mt={16}>
                      <Text size="sm" c="gray">
                        Don't have an account yet?{' '}
                        <Anchor component="button" type="button" fw={600} c="#1971C2">
                          Sign up
                        </Anchor>
                      </Text>
                    </Group>
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
