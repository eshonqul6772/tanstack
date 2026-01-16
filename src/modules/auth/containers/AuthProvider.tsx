import React, { useEffect, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';

import { storage } from '@/services';
import * as Api from '@/modules/auth/api';
import * as Types from '@/modules/auth/types';
import * as Actions from '@/modules/auth/actions';
import * as Mappers from '@/modules/auth/mappers';
import * as Constants from '@/modules/auth/constants';

import { AuthProviderComp } from '@/providers/AuthProvider';
import { authReducer, initialState } from '@/modules/auth/reducer';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = storage.local.get('auth_token');
    const [state, dispatch] = useReducer(authReducer, {
        ...initialState,
        token: token,
        isFetched: !token,
    });

    const { data, error } = useQuery<Types.IQuery.Profile>({
        queryKey: [Constants.ENTITY, 'profile', state.token],
        queryFn: async () => {
            dispatch(Actions.Profile.request());

            const { data } = await Api.Profile();
            return Mappers.getProfile(data?.data);
        },
        enabled: !!state.token,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            dispatch(Actions.Profile.success({ profile: data }));
        }

        if (error) {
            dispatch(Actions.Logout.request());
        }
    }, [data, error, dispatch]);

    return (
        <AuthProviderComp value={{ state, dispatch }}>
            {children}
        </AuthProviderComp>
    );
};

export default AuthProvider;