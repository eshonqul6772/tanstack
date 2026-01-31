import { useMutation } from '@tanstack/react-query';

import * as Api from '../api/api';
import type * as Types from '../model/types';

export const useCreate = () =>
  useMutation<Types.IEntity.Data, Error, Types.IForm.Values>({
    mutationFn: async values => {
      const { data } = await Api.Create({ values });
      return data.data;
    }
  });
