import * as Api from '@/features/auth/api/api';
import { useAuth as useAuthOriginal } from '@/features/auth/model/AuthContext';
import * as Actions from '@/features/auth/model/actions';
import type * as Types from '@/features/auth/model/types';

type AuthStore = {
  isAuthenticated: boolean;
  isFetched: boolean;
  token: string;
  profile: Types.IEntity.Profile;
  state: Types.IState;
  dispatch: ReturnType<typeof useAuthOriginal>['dispatch'];
  methods: {
    logout: () => Promise<void>;
  };
};

let globalAuthStore: AuthStore | null = null;

export const useAuth = () => {
  const { state, dispatch } = useAuthOriginal();

  const authObj = {
    isAuthenticated: state.isAuthenticated,
    isFetched: state.isFetched,
    token: state.token,
    profile: state.profile,
    state,
    dispatch,

    methods: {
      logout: async () => {
        dispatch(Actions.Logout.request());
        try {
          // API'ga logout so'rovi yuborish
          if (state.token) {
            await Api.Logout();
          }
        } catch (_error) {
          // Xato bo'lsa ham logout qilish
        } finally {
          dispatch(Actions.Logout.success());
        }
      }
    }
  };

  globalAuthStore = authObj;

  return authObj;
};

export const getAuthStore = () => globalAuthStore;
