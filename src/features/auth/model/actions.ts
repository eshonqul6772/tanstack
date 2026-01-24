import { createAction } from 'typesafe-actions';
import * as Constants from './constants';
import type * as Types from './types';

export const Login = {
  request: createAction(Constants.LOGIN.REQUEST)(),
  success: createAction(Constants.LOGIN.SUCCESS, (args: Types.IAction.Login.Success) => args)()
};

export const Profile = {
  request: createAction(Constants.PROFILE.REQUEST)(),
  success: createAction(Constants.PROFILE.SUCCESS, (args: Types.IAction.Profile.Success) => args)()
};

export const Logout = {
  request: createAction(Constants.LOGOUT.REQUEST)(),
  success: createAction(Constants.LOGOUT.SUCCESS)()
};
