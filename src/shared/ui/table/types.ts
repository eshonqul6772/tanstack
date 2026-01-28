import type { ReactNode } from 'react';
import type { PaginationParams } from '@/widgets/layout/components/Sidebar/menu';

export interface ListTableProps<T> {
  data: T[];
  pagination: PaginationParams;
  rowCount: number;
  renderActions: (row: T) => ReactNode;
}
