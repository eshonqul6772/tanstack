import { get } from 'lodash';

import config from '@/shared/config';

import { STATUS, STATUS_VARIANT } from '@/shared/lib/utils/enums';
import type { IActionBy, IFile, IIdAndMultiName, IIdAndName, IMeta, IMultiName } from '@/shared/lib/utils/interfaces';

export const getMeta = (item?: unknown): IMeta => ({
  totalPages: get(item, 'totalPages') || 0,
  totalItems: get(item, 'totalCount') || 0,
  current: get(item, 'page') ? get(item, 'page') + 1 : 1,
  perPage: get(item, 'size') || 1
});

export const getFile = (item?: unknown): IFile => {
  const uuid = get(item, 'uuid') || '';
  const type = get((get(item, 'type') || '').split('/'), '[0]') || '';

  return {
    id: get(item, 'id') as number,
    name: get(item, 'name') || '',
    url: `${config.api.baseUrl}/references/download/${uuid}`,
    size: getFileSize(get(item, 'size') || 0),
    type: type,
    extension: get(item, 'extension') || '',
    uuid: get(item, 'uuid') || ''
  };
};

export const getFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const getMultiName = (item?: IMultiName): IMultiName => ({
  uz: get(item, 'uz') || '',
  ru: get(item, 'ru') || '',
  en: get(item, 'en') || ''
});

export const getIdAndMultiName = (item?: IIdAndMultiName): IIdAndMultiName => ({
  id: get(item, 'id') as number,
  name: getMultiName(get(item, 'name'))
});

export const getIdAndName = (item?: IIdAndName): IIdAndName => ({
  id: get(item, 'id') as number,
  name: get(item, 'name') || ''
});

export const getActionBy = (item?: IActionBy): IActionBy => ({
  id: get(item, 'id') as number,
  firstName: get(item, 'firstName') || '',
  lastName: get(item, 'lastName') || '',
  middleName: get(item, 'middleName') || '',
  status: get(item, 'status') || STATUS.INACTIVE
});

export const getStatus = (item: unknown) => {
  const status = (get(item, 'status') || '') as STATUS;
  return {
    value: status,
    variant: STATUS_VARIANT[status]
  };
};
