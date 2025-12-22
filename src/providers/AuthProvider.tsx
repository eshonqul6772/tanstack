import React, {createContext, useContext} from 'react';
import * as Types from '@/modules/auth/types';
import * as Action from '@/modules/auth/actions';

interface Context {
    state: Types.IState;
    dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext<Context | null>(null);

const useAuthProvider: () => Context = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('AuthProvider not found');
    return ctx;
};

export default useAuthProvider;
