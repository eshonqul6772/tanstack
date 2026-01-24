  import type { PERMISSIONS } from '@/shared/lib/utils/enums';

export interface MenuItem {
  label: string;
  path: string;
  icon: string;
  permission?: PERMISSIONS[];
}

export interface MenuSection {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'DASHBOARD',
    label: 'DASHBOARD',
    icon: '📊',
    items: [
      { label: 'Ecommerce', path: '/dashboard', icon: '🛍', permission: ['VIEW_USERS'] },
      { label: 'Project', path: '/project', icon: '📋', permission: ['VIEW_USER'] },
      { label: 'Marketing', path: '/marketing', icon: '📊', permission: ['CREATE_USER'] },
      { label: 'Analytic', path: '/analytic', icon: '📈', permission: ['UPDATE_USER'] },
    ],
  },
  {
    id: 'CONCEPTS',
    label: 'CONCEPTS',
    icon: '💡',
    items: [
      { label: 'AI', path: '/ai', icon: '🤖', permission: ['VIEW_ROLES'] },
      { label: 'Projects', path: '/projects', icon: '🗂', permission: ['VIEW_ROLE'] },
      { label: 'Customer', path: '/customer', icon: '👤', permission: ['VIEW_USERS'] },
      { label: 'Products', path: '/products', icon: '📦', permission: ['CREATE_USER'] },
      { label: 'Orders', path: '/orders', icon: '📮', permission: ['UPDATE_USER'] },
      { label: 'Account', path: '/account', icon: '⚙', permission: ['DELETE_USER'] },
      { label: 'Help Center', path: '/help', icon: '❓', permission: ['VIEW_TRANSLATIONS'] },
      { label: 'Calendar', path: '/calendar', icon: '📅', permission: ['VIEW_TRANSLATION'] },
      { label: 'File Manager', path: '/files', icon: '📁', permission: ['CREATE_TRANSLATION'] },
      { label: 'Mail', path: '/mail', icon: '✉', permission: ['UPDATE_TRANSLATION'] },
      { label: 'Chat', path: '/chat', icon: '💬', permission: ['DELETE_TRANSLATION'] },
    ],
  },
];

export const DEFAULT_EXPANDED_SECTIONS = ['DASHBOARD'];
