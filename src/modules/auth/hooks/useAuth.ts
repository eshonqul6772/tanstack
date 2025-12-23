import { useAuth } from '@/providers/AuthProvider';

import * as Constants from '../constants'

const useAuthHook = () => {
  const { state, dispatch } = useAuth();

  return {
    isAuthenticated: state.isAuthenticated,
    isFetched: state.isFetched,
    token: state.token,
    profile: state.profile,

    methods: {
      logout: () => dispatch({ type: Constants.LOGOUT.REQUEST }),
    },
  };
};

export default useAuthHook;
