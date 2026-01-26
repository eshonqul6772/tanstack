import { Link, useLocation } from '@tanstack/react-router';
import { ActionIcon, Box, Collapse, Group, NavLink, Stack, Text, Title, rem } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import type React from 'react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { DEFAULT_EXPANDED_SECTIONS, MENU_SECTIONS, type MenuItem } from './menu';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpenMenu: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpenMenu }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(DEFAULT_EXPANDED_SECTIONS);
  const location = useLocation();
  const auth = useAuth();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]));
  };

  const isActive = (path: string) => location.pathname === path;

  const hasPermission = (item: MenuItem): boolean => {
    if (!item.permission || item.permission.length === 0) {
      return true;
    }
    return item.permission.some(perm => auth.profile.permissions.includes(perm));
  };

  const renderMenuItems = (items: MenuItem[]) => (
    <Stack gap="xs" pl={isOpenMenu ? 'md' : 0}>
      {items.filter(hasPermission).map(item => (
        <NavLink
          key={item.path}
          component={Link}
          to={item.path}
          label={isOpenMenu ? item.label : undefined}
          leftSection={<span style={{ fontSize: rem(18) }}>{item.icon}</span>}
          active={isActive(item.path)}
          title={!isOpenMenu ? item.label : ''}
          styles={{
            root: {
              borderRadius: 'var(--mantine-radius-md)',
              '&[data-active]': {
                backgroundColor: 'var(--mantine-colors-blue-0)',
                color: 'var(--mantine-colors-blue-6)',
                fontWeight: 500
              }
            }
          }}
        />
      ))}
    </Stack>
  );

  return (
    <Box component="aside" className={styles.sidebar}>
      {isOpenMenu && (
        <Box className={styles.header}>
          <Title order={2} size="h3">
            Ecme
          </Title>
        </Box>
      )}

      <Stack component="nav" gap="lg" className={styles.nav}>
        {MENU_SECTIONS.map(section => (
          <Box key={section.id}>
            <Group
              justify={isOpenMenu ? 'space-between' : 'center'}
              onClick={() => toggleSection(section.id)}
              style={{
                cursor: 'pointer',
                padding: 'var(--mantine-spacing-xs) var(--mantine-spacing-sm)',
                borderRadius: 'var(--mantine-radius-md)',
                userSelect: 'none'
              }}
              className="hover-bg"
            >
              {!isOpenMenu && (
                <ActionIcon variant="subtle" size="lg" radius="md" title={section.label}>
                  <span style={{ fontSize: rem(18) }}>{section.icon}</span>
                </ActionIcon>
              )}
              {isOpenMenu && (
                <>
                  <Group gap="xs">
                    <span style={{ fontSize: rem(16) }}>{section.icon}</span>
                    <Text size="xs" fw={600} tt="uppercase" c="dimmed">
                      {section.label}
                    </Text>
                  </Group>
                  <IconChevronDown
                    size={18}
                    style={{
                      transition: 'transform 300ms ease-in-out',
                      transform: expandedSections.includes(section.id) ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </>
              )}
            </Group>
            <Collapse
              in={expandedSections.includes(section.id)}
              transitionDuration={300}
              transitionTimingFunction="ease-in-out"
            >
              {renderMenuItems(section.items)}
            </Collapse>
          </Box>
        ))}
      </Stack>

      {isOpenMenu && (
        <Box className={styles.footer}>
          <Text className={styles.footerText}>
            Copyright © 2026{' '}
            <Text span fw={600}>
              Ecme
            </Text>{' '}
            All rights reserved.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
