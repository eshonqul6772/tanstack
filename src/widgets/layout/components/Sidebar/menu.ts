import type { PERMISSIONS } from '@/shared/lib/utils/enums';

export type PaginatedData<T> = {
  result: T[];
  rowCount: number;
};

export type PaginationParams = {
  pageIndex: number;
  pageSize: number;
};

export type SortParams = { sortBy: `${string}.${'asc' | 'desc'}` };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;

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
      { label: 'Users', path: '/users', icon: '👤', permission: ['VIEW_USERS'] },
      { label: 'Translations', path: '/translations', icon: '🌐', permission: ['VIEW_USERS'] }
    ]
  }
];

export const DEFAULT_EXPANDED_SECTIONS = ['DASHBOARD'];
