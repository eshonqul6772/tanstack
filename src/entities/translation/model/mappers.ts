import get from 'lodash/get';

import { getMultiName } from '@/shared/lib/utils/mappers';

import type * as Types from './types';

export const getData = (item?: any): Types.IEntity.Data => ({
  id: get(item, 'id') || '',
  name: getMultiName(get(item, 'name')),
  tag: get(item, 'tag') || '',
  types: get(item, 'types') || [],
  status: get(item, 'status') || ''
});

export const getFormValues = (item?: Types.IEntity.Data): Types.IForm.Values => ({
  name: item?.name || { uz: '', ru: '', en: '' },
  tag: item?.tag || '',
  types: item?.types || [],
  status: item?.status || ''
});
