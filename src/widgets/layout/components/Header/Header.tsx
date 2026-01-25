import type React from 'react';
import { Menu, } from '@mantine/core';
import { IconSettings, IconLogout, IconMenu2, IconX } from '@tabler/icons-react';
import { useAuth } from '@/features/auth/hooks';
import cls from './Header.module.scss';

interface HeaderProps {
  isOpenMenu: boolean;
  onToggleMenu: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isOpenMenu, onToggleMenu }) => {
  const { profile, methods } = useAuth();

  return (
    <header className={cls.header}>
      <div className={cls.container}>
        <button
          className={cls.toggleButton}
          onClick={() => onToggleMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        <div className={cls.contentWrapper}>
          <Menu position="bottom-end" shadow="md" withArrow>
            <Menu.Target>
              <div className={cls.userMenuGroup}>
                <div className={cls.avatar}>
                  {profile?.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconSettings size={14} />}>
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={14} />}
                onClick={() => methods.logout()}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
