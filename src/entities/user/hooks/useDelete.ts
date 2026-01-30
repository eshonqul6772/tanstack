import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import type * as Types from '../model/types';

export const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, Types.IQuery.Delete>({
    mutationFn: async ({ id }) => {
      await Api.Delete({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === Constants.ENTITY && query.queryKey[1] === 'list'
      });
    }
  });
};
