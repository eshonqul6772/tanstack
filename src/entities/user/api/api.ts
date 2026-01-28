import type { AxiosPromise } from 'axios';
import { http } from '@/shared/api';
import type { IParams } from '@/shared/lib/utils/interfaces';
import type * as Types from '../model/types';

export const List = ({ params }: { params: IParams }): AxiosPromise<Types.IApi.List.Response> =>
  http.post('/admin/users/pageable', {
    perPage: params.perPage,
    page: params.page,
    sort: params.sort,
    search: params.filter
  });

export const Single = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.get(`/admin/users/${id}`);

export const Create = ({ values }: { values: Types.IForm.Values }): AxiosPromise<Types.IApi.Single.Response> =>
  http.post('/admin/users', {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    password: values.password,
    photoId: values.photoId,
    roleId: values.roleId,
    status: values.status
  });

export const Update = ({
  id,
  values
}: {
  id: string;
  values: Types.IForm.Values;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.put(`/admin/users/${id}`, {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    password: values.password,
    photoId: values.photoId,
    roleId: values.roleId,
    status: values.status
  });

export const Delete = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.delete(`/admin/users/${id}`);
