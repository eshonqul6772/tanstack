import { useQuery } from '@tanstack/react-query';

import type { IIdAndName } from '@/shared/lib/utils/interfaces';
import { getIdAndName } from '@/shared/lib/utils/mappers';

import * as Api from '../api/api';
import * as Constants from '../model/constants';

interface ISelectItems {
  items: IIdAndName[];
}

export const useSelect = () => {
  const initialData = { items: [] } as ISelectItems;

  const { data = initialData, ...args } = useQuery<ISelectItems, string>({
    queryKey: [Constants.ENTITY, 'select'],
    queryFn: async () => {
      const { data } = await Api.Select();

      const items = (data || []).map(item => getIdAndName(item));

      return { items };
    },
    initialData,
    placeholderData: previousData => previousData ?? initialData,
    retry: false
  });

  return { ...data, ...args };
};
