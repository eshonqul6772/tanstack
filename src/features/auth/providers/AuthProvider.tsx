import React, { useEffect, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';

import storage from '@/shared/lib/storage';
import * as Api from '@/features/auth/api/api';
import * as Types from '@/features/auth/model/types';
import * as Actions from '@/features/auth/model/actions';
import * as Mappers from '@/features/auth/model/mappers';
import * as Constants from '@/features/auth/model/constants';

import { AuthProviderComp } from '@/features/auth/model/AuthContext';
import { authReducer, initialState } from '@/features/auth/model/reducer';

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
