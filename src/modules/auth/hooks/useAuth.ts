import { useAuth as useAuthOriginal } from '@/providers/AuthProvider';
import * as Api from '../api';
import * as Actions from '../actions';

let globalAuthStore: any = null;

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
                } catch (error) {
                    // Xato bo'lsa ham logout qilish
                } finally {
                    dispatch(Actions.Logout.success());
                }
            },
        },
    };

    globalAuthStore = authObj;

    return authObj;
};

export const getAuthStore = () => globalAuthStore;  