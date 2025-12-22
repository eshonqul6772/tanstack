import { get } from 'lodash';

import { getFile, getIdAndName } from '@/utils/mappers';

import * as Types from './types';

export const getProfile = (item?: any): Types.IEntity.Profile => {
  const firstName = get(item, 'firstName') || '';
  const lastName = get(item, 'lastName') || '';
  const middleName = get(item, 'middleName') || '';

  return {
    id: get(item, 'id') || '',
    fullName: `${lastName} ${firstName} ${middleName}`,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    photo: getFile(get(item, 'photo')),
    login: get(item, 'login') || '',
    role: getIdAndName(get(item, 'role')),
    permissions: get(item, 'permissions') || [],
    cabinetType: get(item, 'cabinetType') || null,
  };
};

export const getToken = (item?: any): Types.IEntity.Token => ({
  accessToken: get(item, 'accessToken') || '',
});
