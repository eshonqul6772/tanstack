import { getFile, getIdAndName } from '@/shared/lib/utils/mappers';
import { ActionType } from 'typesafe-actions'

import storage from '@/shared/lib/storage';

import * as Types from './types';
import * as Actions from './actions';
import * as Constants from './constants';

export const initialState: Types.IState = {
    isAuthenticated: false,
    isFetched: true,
    token: '',
    profile: {
        id: '',
        fullName: '',
        firstName: '',
        lastName: '',
        middleName: '',
        photo: getFile(),
        login: '',
        role: getIdAndName(),
        permissions: [],
        cabinetType: null,
    },
};

export const authReducer = (
    state: Types.IState = initialState,
    action: ActionType<typeof Actions>,
): Types.IState => {
    switch (action.type) {
        case Constants.LOGIN.SUCCESS: {
            console.log('action', action)
            const { token } = action.payload;

            return {
                ...state,
                isAuthenticated: false,
                isFetched: false,
                token: token.accessToken,
            };
        }

        case Constants.PROFILE.REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                isFetched: false,
            };

        case Constants.PROFILE.SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isFetched: true,
                profile: action.payload.profile,
            };

        case Constants.LOGIN.REQUEST:
            return {
                ...state,
                isFetched: false,
            };

        case Constants.LOGOUT.REQUEST:
            // Token'ni storage'dan o'chirish
            storage.local.remove('auth_token');
            return {
                ...state,
                isAuthenticated: false,
                isFetched: false,
            };

        case Constants.LOGOUT.SUCCESS:
            // Token'ni storage'dan o'chirish (agar hali o'chirilmagan bo'lsa)
            storage.local.remove('auth_token');
            return {
                ...initialState,
                token: '',
                isAuthenticated: false,
                isFetched: true,
            };

        default:
            return state;
    }
};
