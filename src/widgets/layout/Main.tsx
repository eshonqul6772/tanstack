import { Outlet } from '@tanstack/react-router';
import {
  ActionIcon,
  Box,
  Group,
  Stack,
  TextInput,
  Avatar,
  Menu,
  Text,
  Paper,
} from '@mantine/core';
import { IconSearch, IconWorld, IconBell, IconSettings, IconLogout } from '@tabler/icons-react';
import { Suspense, useState } from 'react';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Suspense fallback={'loading'}>
      <Box component="div" style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--mantine-colors-gray-0)' }}>
        <Box
          style={{
            transition: 'width 300ms ease-in-out',
            width: sidebarOpen ? '256px' : '80px',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: 'white',
            borderRight: '1px solid #e5e5e5',
          }}
        >
          <Sidebar sidebarOpen={sidebarOpen} />
        </Box>

        <Stack gap={0} style={{ flex: 1 }}>
          <Box p="md" style={{ borderBottom: '1px solid #e5e5e5', minHeight: 64, display: 'flex', alignItems: 'center', backgroundColor: 'var(--mantine-colors-blue-0)' }}>
            <Group justify="space-between" style={{ width: '100%' }}>
              <ActionIcon
                variant="light"
                size="lg"
                color="blue"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                title="Toggle sidebar"
              >
                <Box component="div" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Box
                    component="span"
                    style={{
                      display: 'block',
                      width: 24,
                      height: 2,
                      backgroundColor: 'var(--mantine-colors-gray-8)',
                      transition: 'all 300ms ease-in-out',
                      transform: sidebarOpen
                        ? 'rotate(45deg) translateY(8px)'
                        : 'rotate(0deg) translateY(0px)',
                    }}
                  />
                  <Box
                    component="span"
                    style={{
                      display: 'block',
                      width: 24,
                      height: 2,
                      backgroundColor: 'var(--mantine-colors-gray-8)',
                      transition: 'opacity 300ms ease-in-out',
                      opacity: sidebarOpen ? 0 : 1,
                    }}
                  />
                  <Box
                    component="span"
                    style={{
                      display: 'block',
                      width: 24,
                      height: 2,
                      backgroundColor: 'var(--mantine-colors-gray-8)',
                      transition: 'all 300ms ease-in-out',
                      transform: sidebarOpen
                        ? 'rotate(-45deg) translateY(-8px)'
                        : 'rotate(0deg) translateY(0px)',
                    }}
                  />
                </Box>
              </ActionIcon>

              <Group justify="space-between" style={{ flex: 1, marginLeft: 24 }}>
                <Text size="lg" fw={700} c="blue">
                  Admin Cabinet
                </Text>

                <Group gap="lg">
                  <TextInput
                    placeholder="Search..."
                    leftSection={<IconSearch size={16} />}
                    style={{ width: 256 }}
                  />

                  <ActionIcon variant="light" color="blue" size="lg" title="Language">
                    <IconWorld size={20} />
                  </ActionIcon>
                  <ActionIcon variant="light" color="blue" size="lg" title="Notifications">
                    <IconBell size={20} />
                  </ActionIcon>
                  <ActionIcon variant="light" color="blue" size="lg" title="Settings">
                    <IconSettings size={20} />
                  </ActionIcon>

                  <Menu position="bottom-end" shadow="md" withArrow>
                    <Menu.Target>
                      <Group gap="sm" style={{ cursor: 'pointer', padding: '8px 4px', borderRadius: 'var(--mantine-radius-md)', border: '2px solid var(--mantine-colors-blue-2)', backgroundColor: 'var(--mantine-colors-blue-0)' }}>
                        <Avatar color="blue" radius="xl" size="md">
                          U
                        </Avatar>
                        <Stack gap={0}>
                          <Text size="sm" fw={500}>
                            User
                          </Text>
                          <Text size="xs" c="dimmed">
                            Profile
                          </Text>
                        </Stack>
                      </Group>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        color="red"
                        leftSection={<IconLogout size={14} />}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Group>
          </Box>

          <Box component="main" style={{ flex: 1, overflowY: 'auto', padding: 16, backgroundColor: 'var(--mantine-colors-gray-0)' }}>
            <Paper p="lg" radius="md" style={{ backgroundColor: 'white' }}>
              <Outlet />
            </Paper>
          </Box>

          <Footer />
        </Stack>
      </Box>
    </Suspense>
  );
};

export default Main;
