export interface MenuItem {
  label: string;
  path: string;
  icon: string;
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
      { label: 'Ecommerce', path: '/dashboard', icon: '🛍' },
      { label: 'Project', path: '/project', icon: '📋' },
      { label: 'Marketing', path: '/marketing', icon: '📊' },
      { label: 'Analytic', path: '/analytic', icon: '📈' },
    ],
  },
  {
    id: 'CONCEPTS',
    label: 'CONCEPTS',
    icon: '💡',
    items: [
      { label: 'AI', path: '/ai', icon: '🤖' },
      { label: 'Projects', path: '/projects', icon: '🗂' },
      { label: 'Customer', path: '/customer', icon: '👤' },
      { label: 'Products', path: '/products', icon: '📦' },
      { label: 'Orders', path: '/orders', icon: '📮' },
      { label: 'Account', path: '/account', icon: '⚙' },
      { label: 'Help Center', path: '/help', icon: '❓' },
      { label: 'Calendar', path: '/calendar', icon: '📅' },
      { label: 'File Manager', path: '/files', icon: '📁' },
      { label: 'Mail', path: '/mail', icon: '✉' },
      { label: 'Chat', path: '/chat', icon: '💬' },
    ],
  },
];

export const DEFAULT_EXPANDED_SECTIONS = ['DASHBOARD'];
