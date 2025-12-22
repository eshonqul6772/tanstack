import React, {useEffect, useReducer} from 'react';
import {useQuery} from '@tanstack/react-query';

import * as Providers from "@/providers";


import * as Api from '../api';
import * as Types from '../types';
import * as Actions from '../actions';
import * as Mappers from '../mappers';
import * as Constants from '../constants';

import { authReducer, initialState } from '../reducer.ts';

const TOKEN_KEY = 'auth_token';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        ...initialState,
        token: localStorage.getItem(TOKEN_KEY) || '',
    });

    const {data, error} = useQuery<Types.IQuery.Profile>({
        queryKey: [Constants.ENTITY, 'profile', state.token],
        queryFn: async () => {
            dispatch(Actions.Profile.request());

            const {data} = await Api.Profile();
            return Mappers.getProfile(data?.data);
        },
        enabled: !!state.token,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            dispatch(Actions.Profile.success({profile: data}));
        }

        if (error) {
            dispatch(Actions.Logout.request());
        }
    }, [data, error]);

    useEffect(() => {
        if (!state.isFetched && !state.token) return;

    }, [state.isFetched]);

    return (
        <Providers.AuthProvider Context={{ state, dispatch }}>
            {children}
        </Providers.AuthProvider>
    );
};

export default AuthProvider;
