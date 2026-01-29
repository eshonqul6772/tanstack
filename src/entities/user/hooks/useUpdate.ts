import { useMutation } from '@tanstack/react-query';

import * as Api from '../api/api';
import type * as Types from '../model/types';

export const useUpdate = () =>
  useMutation<Types.IEntity.User, Error, { id: string; values: Types.IForm.Values }>({
    mutationFn: async ({ id, values }) => {
      const { data } = await Api.Update({ id, values });
      return data.data;
    }
  });
