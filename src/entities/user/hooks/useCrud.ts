import { createCrudFromEntity } from '@/shared/lib/hooks/crud';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type * as Types from '../model/types';

export const { useDelete, useSingle } = createCrudFromEntity<
  Types.IEntity.Data,
  Types.IQuery.Delete,
  Types.IApi.Single.Response['data']
>({
  entity: Constants.ENTITY,
  deleteFn: Api.Delete,
  singleFn: Api.Single,
  mapSingle: Mappers.getData
});
