import {getFile, getIdAndName} from '@/utils/mappers';
import {ActionType} from 'typesafe-actions'

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
            const {token} = action.payload;

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

        case Constants.LOGOUT.SUCCESS:
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
