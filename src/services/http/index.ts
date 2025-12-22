import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';
import get from 'lodash/get';

import AuthContext from '@/providers/AuthProvider';
import * as Actions from '@/modules/auth/actions';
import {MESSAGE_TYPE} from '@/utils/enums';

const store = AuthContext();

const StatusCode = {
    Unauthorized: 401,
    Forbidden: 403,
    TooManyRequests: 429,
    InternalServerError: 500,
} as const;

type InitOptions = {
    config?: AxiosRequestConfig;
    configFn?: (
        config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
};

type RefreshQueueItem = {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
};

class Http {
    private instance!: AxiosInstance;

    private isRefreshing = false;
    private refreshQueue: RefreshQueueItem[] = [];

    private readonly defaultConfig: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    };

    /* ================= INIT ================= */

    public init({config, configFn}: InitOptions = {}) {
        if (this.instance) return this.instance;

        this.instance = axios.create({
            ...this.defaultConfig,
            ...config,
        });

        this.attachInterceptors(configFn);

        return this.instance;
    }

    /* ================= INTERCEPTORS ================= */

    private attachInterceptors(
        configFn?: InitOptions['configFn'],
    ) {
        /* ===== REQUEST ===== */
        this.instance.interceptors.request.use(
            async (config) => {
                if (configFn) {
                    const newConfig = await configFn(config);
                    return {...config, ...newConfig};
                }
                return config;
            },
            Promise.reject,
        );

        /* ===== RESPONSE ===== */
        this.instance.interceptors.response.use(
            response => response,
            error => this.handleResponseError(error),
        );
    }

    /* ================= ERRORS ================= */

    private async handleResponseError(error: AxiosError) {
        const {response, config} = error;

        if (response?.data) {
            this.showNotification(response.data);
        }

        if (response?.status === StatusCode.Unauthorized && config) {
            return this.handle401(config);
        }

        this.handleCommonErrors(response?.status);
        return Promise.reject(error);
    }

    private handleCommonErrors(status?: number) {
        switch (status) {
            case StatusCode.Forbidden:
                break;
            case StatusCode.TooManyRequests:
                break;
            case StatusCode.InternalServerError:
                break;
        }
    }

    /* ================= REFRESH TOKEN ================= */

    private async handle401(originalRequest: AxiosRequestConfig) {
        if (originalRequest.url?.includes('refresh-token')) {
            store.dispatch(Actions.Logout.request());
            return Promise.reject('Session expired');
        }

        if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
                this.refreshQueue.push({
                    resolve: token => {
                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${token}`,
                        };
                        resolve(this.request(originalRequest));
                    },
                    reject,
                });
            });
        }

        this.isRefreshing = true;

        try {
            const token = store.state.token;
            this.resolveQueue(token);

            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
            };

            return this.request(originalRequest);
        } catch (err) {
            this.rejectQueue(err);
            store.dispatch(Actions.Logout.request());
            return Promise.reject(err);
        } finally {
            this.isRefreshing = false;
        }
    }

    private resolveQueue(token: string) {
        this.refreshQueue.forEach(p => p.resolve(token));
        this.refreshQueue = [];
    }

    private rejectQueue(error: unknown) {
        this.refreshQueue.forEach(p => p.reject(error));
        this.refreshQueue = [];
    }

    /* ================= UI ================= */

    private showNotification(data: unknown) {
        const code = get(data, 'code');
        const type = get(data, 'type');

        if (!code || !type) return;

        const map: Record<string, Function> = {
            [MESSAGE_TYPE.INFO]: console.info,
            [MESSAGE_TYPE.WARNING]: console.warn,
            [MESSAGE_TYPE.ERROR]: console.error,
        };

        map[type]?.(code);
    }

    /* ================= PUBLIC ================= */

    public request<T = any>(config: AxiosRequestConfig) {
        if (!this.instance) {
            throw new Error('Http is not initialized. Call Http.init() first.');
        }
        return this.instance.request<T>(config);
    }
}

export default new Http();
