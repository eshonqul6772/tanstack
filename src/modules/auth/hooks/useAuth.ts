import {useAuth as useAuthOriginal} from '@/providers/AuthProvider';
import * as Constants from '../constants'

let globalAuthStore: any = null;

export const useAuth = () => {
    const {state, dispatch} = useAuthOriginal();

    const authObj = {
        isAuthenticated: state.isAuthenticated,
        isFetched: state.isFetched,
        token: state.token,
        profile: state.profile,
        state,
        dispatch,

        methods: {
            logout: () => dispatch({type: Constants.LOGOUT.REQUEST}),
        },
    };

    globalAuthStore = authObj;

    return authObj;
};

export const getAuthStore = () => globalAuthStore;