import { AxiosPromise } from 'axios';

import { http } from '@/services';

import * as Types from './types';

export const Login = ({
  values,
}: {
  values: Types.IForm.Login;
}): AxiosPromise<Types.IApi.Login.Response> =>
  http.request.post('/auth/login', {
    username: values.username.trim(),
    password: values.password.trim(),
    remember_me: false,
  });

export const Logout = () => http.request.post('/auth/logout');

export const Profile = (): AxiosPromise<Types.IApi.Profile.Response> =>
  http.request.get('/auth/me');
