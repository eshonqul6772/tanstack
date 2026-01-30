import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type * as Types from '../model/types';

export const usePermission = () => {
  const initialData = { items: [] } as Types.IQuery.Permission;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Permission, string, Types.IQuery.Permission>({
    queryKey: [Constants.ENTITY, 'permission'],
    queryFn: async () => {
      const { data } = await Api.Permission();

      const items = (data || []).map((item: any) => Mappers.getPermission(item));

      return { items };
    },
    initialData,
    retry: false
  });

  return { ...data, ...args };
};
