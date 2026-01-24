import {ActionType} from 'typesafe-actions';
import React, {createContext, useContext, ReactNode} from 'react';

import * as Types from '@/features/auth/model/types';
import * as Actions from '@/features/auth/model/actions';

interface Context {
    state: Types.IState;
    dispatch: React.Dispatch<ActionType<typeof Actions>>;
}

export const AuthContext = createContext<Context | undefined>(undefined);

export const useAuth = (): Context => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
    value: Context;
}

export const AuthProviderComp: React.FC<AuthProviderProps> = ({children, value}) => (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);
