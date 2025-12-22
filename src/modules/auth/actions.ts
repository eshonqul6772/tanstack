import { action } from 'typesafe-actions';

import * as Types from './types';
import * as Constants from './constants';

export const Login = {
  request: () => action(Constants.LOGIN.REQUEST),
  success: (args: Types.IAction.Login.Success) => action(Constants.LOGIN.SUCCESS, args),
};

export const Profile = {
  request: () => action(Constants.PROFILE.REQUEST),
  success: (args: Types.IAction.Profile.Success) => action(Constants.PROFILE.SUCCESS, args),
};

export const Logout = {
  request: () => action(Constants.LOGOUT.REQUEST),
  success: () => action(Constants.LOGOUT.SUCCESS),
};
