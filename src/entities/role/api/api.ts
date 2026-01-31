import type { AxiosPromise } from 'axios';

import { http } from '@/shared/api';
import type { IParams } from '@/shared/lib/utils/interfaces';

import type * as Types from '../model/types';

export const Select = (): AxiosPromise<Types.IApi.Select.Response> => http.get('/admin/references/roles');

export const Permission = (): AxiosPromise<Types.IApi.Permission.Response> => http.get('/admin/references/permissions');

export const List = ({ params }: { params: IParams }): AxiosPromise<Types.IApi.List.Response> =>
  http.post('/admin/roles/pageable', {
    perPage: params.perPage,
    page: params.page,
    sort: params.sort,
    search: params.filter
  });

export const Single = ({ id }: { id: number }): AxiosPromise<Types.IApi.Single.Response> =>
  http.get(`/admin/roles/${id}`);

export const Create = ({ values }: { values: Types.IForm.Values }): AxiosPromise<Types.IApi.Single.Response> =>
  http.post('/admin/roles', {
    name: values.name,
    description: values.description,
    permissions: values.permissions,
    status: values.status
  });

export const Update = ({
  id,
  values
}: {
  id: number;
  values: Types.IForm.Values;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.put(`/admin/roles/${id}`, {
    name: values.name,
    description: values.description,
    permissions: values.permissions,
    status: values.status
  });

export const Delete = ({ id }: { id: number | null }): AxiosPromise<Types.IApi.Single.Response> =>
  http.delete(`/admin/roles/${id}`);
