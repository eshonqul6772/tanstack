import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import type * as Types from '../model/types';

interface IProps {
  id?: string;
}

export const useSingle = ({ id }: IProps) => {
  const { data, ...args } = useQuery<Types.IEntity.User>({
    queryKey: [Constants.ENTITY, 'single', id],
    queryFn: async () => {
      const { data } = await Api.Single({ id: id ?? '' });
      return data.data;
    },
    enabled: !!id,
    retry: false
  });

  return { item: data, ...args };
};
