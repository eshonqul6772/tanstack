import type React from 'react';
import {Link, useLocation} from '@tanstack/react-router';
import {Box, NavLink, Stack, Text, rem} from '@mantine/core';
import cx from 'classnames';

import {useAuth} from '@/features/auth/hooks/useAuth';

import {MENU_ITEMS, type MenuItem} from './menu';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpenMenu: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({isOpenMenu}) => {
  const location = useLocation();
  const auth = useAuth();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const hasPermission = (item: MenuItem): boolean => {
    if (!item.permission || item.permission.length === 0) {
      return true;
    }
    return item.permission.some(perm => auth.profile?.permissions.includes(perm));
  };

  return (
    <Box component="aside" className={styles.sidebar} style={{
      width: isOpenMenu ? '300px' : '80px',
    }}>

      <Stack component="nav" gap="lg" className={styles.nav}>
        {isOpenMenu && (
          <Box className={styles.header}>

          </Box>
        )}
        {MENU_ITEMS.filter(hasPermission).map(item => (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={isOpenMenu ? item.label : undefined}
            leftSection={<span style={{fontSize: rem(18)}}>{item.icon}</span>}
            active={isActive(item.path)}
            title={!isOpenMenu ? item.label : ''}
            className={cx(styles.navLink, isActive(item.path) && styles.navLinkActive, !isOpenMenu && styles.navLinkCollapsed)}
          />
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
