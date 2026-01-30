import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type * as Types from '../model/types';

interface IProps {
  id?: number;
}

export const useSingle = ({ id }: IProps) => {
  const { data, ...args } = useQuery<Types.IEntity.Data>({
    queryKey: [Constants.ENTITY, 'single', id],
    queryFn: async () => {
      // @ts-expect-error
      const { data } = await Api.Single({ id: id ?? null });
      return Mappers.getData(data.data);
    },
    enabled: !!id,
    retry: false
  });

  return { item: data, ...args };
};
