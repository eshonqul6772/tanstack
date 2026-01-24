import { createAction } from 'typesafe-actions';

import * as Types from './types';
import * as Constants from './constants';

export const Login = {
    request: createAction(Constants.LOGIN.REQUEST)(),
    success: createAction(Constants.LOGIN.SUCCESS, (args: Types.IAction.Login.Success) => args)(),
};

export const Profile = {
    request: createAction(Constants.PROFILE.REQUEST)(),
    success: createAction(Constants.PROFILE.SUCCESS, (args: Types.IAction.Profile.Success) => args)(),
};

export const Logout = {
    request: createAction(Constants.LOGOUT.REQUEST)(),
    success: createAction(Constants.LOGOUT.SUCCESS)(),
};