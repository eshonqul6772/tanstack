import { useQuery } from '@tanstack/react-query';

import config from '@/shared/config';
import type { IMeta, IParams } from '@/shared/lib/utils/interfaces';
import { getMeta } from '@/shared/lib/utils/mappers';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import type * as Types from '../model/types';

interface IProps {
  params?: IParams;
}

export const useList = ({ params }: IProps = {}) => {
  const initialMeta: IMeta = {
    ...getMeta(),
    perPage: params?.perPage || config.list.perPage
  };
  const initialData: Types.IQuery.List = { items: [], meta: initialMeta };

  const paramsWithDefaults = {
    page: params?.page ? params.page - 1 : 0,
    perPage: params?.perPage || config.list.perPage,
    sort: {
      name: params?.sort?.name || 'id',
      direction: params?.sort?.direction || 'desc'
    },
    filter: (params?.filter || []).filter(item => !!item.value)
  };

  const { data = initialData, ...args } = useQuery<Types.IQuery.List>({
    queryKey: [Constants.ENTITY, 'list', paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.List({ params: paramsWithDefaults });

      return {
        items: data.data || [],
        meta: data.meta || initialMeta
      };
    },
    initialData,
    retry: false
  });

  return { ...data, ...args };
};
