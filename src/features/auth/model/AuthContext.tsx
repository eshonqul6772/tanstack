import type React from 'react';
import { createContext, type ReactNode, useContext } from 'react';
import type { ActionType } from 'typesafe-actions';
import type * as Actions from '@/features/auth/model/actions';
import type * as Types from '@/features/auth/model/types';

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

export const AuthProviderComp: React.FC<AuthProviderProps> = ({ children, value }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);
