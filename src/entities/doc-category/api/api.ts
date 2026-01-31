import type { AxiosPromise } from 'axios';

import { http } from '@/shared/api';
import type { IParams } from '@/shared/lib/utils/interfaces';

import type * as Types from '../model/types';

export const List = ({ params }: { params: IParams }): AxiosPromise<Types.IApi.List.Response> =>
  http.post('/admin/docs/categories/pageable', {
    perPage: params.perPage,
    page: params.page,
    sort: params.sort,
    search: params.filter
  });

export const ByVersion = ({ versionId }: { versionId: number }): AxiosPromise<Types.IApi.List.Response> =>
  http.get(`/admin/docs/categories/by-version/${versionId}`);

export const Single = ({ id }: { id: number }): AxiosPromise<Types.IApi.Single.Response> =>
  http.get(`/admin/docs/categories/${id}`);

export const Create = ({ values }: { values: Types.IForm.Values }): AxiosPromise<Types.IApi.Single.Response> =>
  http.post('/admin/docs/categories', {
    ...values,
    versionId: Number(values.versionId),
    parentId: values.parentId ? Number(values.parentId) : null
  });

export const Update = ({
  id,
  values
}: {
  id: number;
  values: Types.IForm.Values;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.put(`/admin/docs/categories/${id}`, {
    ...values,
    versionId: Number(values.versionId),
    parentId: values.parentId ? Number(values.parentId) : null
  });

export const Delete = ({ id }: { id: number | null }): AxiosPromise<Types.IApi.Single.Response> =>
  http.delete(`/admin/docs/categories/${id}`);
