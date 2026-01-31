import get from 'lodash/get';

import { STATUS } from '@/shared/lib/utils/enums.ts';

import type * as Types from './types';

export const getData = (item?: any): Types.IEntity.Data => ({
  id: get(item, 'id') || '',
  name: get(item, 'name') || '',
  description: get(item, 'description') || '',
  permissions: get(item, 'permissions') || [],
  createdAt: get(item, 'createdAt') || '',
  updatedAt: get(item, 'updatedAt') || '',
  status: get(item, 'status') || ''
});

export const getPermission = (item?: any): Types.IEntity.Permission => ({
  name: get(item, 'name') || '',
  key: get(item, 'key') || ''
});

export const getFormValues = (item?: Types.IEntity.Data): Types.IForm.Values => ({
  name: item?.name || '',
  description: item?.description || '',
  permissions: item?.permissions || [],
  status: (item?.status as STATUS) || STATUS.INACTIVE
});
