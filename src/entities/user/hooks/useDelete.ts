import { useMutation } from '@tanstack/react-query';

import * as Api from '../api/api';
import type * as Types from '../model/types';

export const useDelete = () =>
  useMutation<Types.IEntity.User, Error, Types.IQuery.Delete>({
    mutationFn: async ({ id }) => {
      const { data } = await Api.Delete({ id });
      return data.data;
    }
  });
