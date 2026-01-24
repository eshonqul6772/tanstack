import type { AxiosPromise } from 'axios';
import type * as Types from '@/features/auth/model/types';
import { http } from '@/shared/api';

export const Login = ({ values }: { values: Types.IForm.Login }): AxiosPromise<Types.IApi.Login.Response> =>
  http.post('/auth/login', {
    username: values.username,
    password: values.password
  });

export const Logout = () => http.post('/auth/logout');

export const Profile = (): AxiosPromise<Types.IApi.Profile.Response> => http.get('/auth/me');
