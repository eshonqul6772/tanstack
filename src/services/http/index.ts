import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';
import {get} from 'lodash';

// import {store, Types} from '@/store';
// import * as Actions from '@/modules/auth/actions';
import {MESSAGE_TYPE} from '@/utils/enums';

const StatusCode = {
    Unauthorized: 401,
    Forbidden: 403,
    TooManyRequests: 429,
    InternalServerError: 500,
} as const;

type RefreshQueueItem = {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
};

class Http {
    private instance: AxiosInstance | null = null;

    private isRefreshing = false;
    private refreshQueue: RefreshQueueItem[] = [];

    private readonly defaultConfig: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    };

    /* ================= INIT ================= */

    private createInstance(config?: AxiosRequestConfig): AxiosInstance {
        const instance = axios.create({
            ...this.defaultConfig,
            ...config,
        });

        this.attachInterceptors(instance);

        return instance;
    }

    private attachInterceptors(instance: AxiosInstance) {
        /* ===== REQUEST ===== */
        instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // const {auth} = store.getState() as Types.IState;

                // if (auth.accessToken) {
                //     config.headers.Authorization = `Bearer ${auth.accessToken}`;
                // }

                return config;
            },
            error => Promise.reject(error),
        );

        /* ===== RESPONSE ===== */
        instance.interceptors.response.use(
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
            // store.dispatch(Actions.Logout.request());
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
                        resolve(this.http(originalRequest));
                    },
                    reject,
                });
            });
        }

        this.isRefreshing = true;

        try {
            const accessToken = await this.requestNewAccessToken();
            this.resolveQueue(accessToken);

            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${accessToken}`,
            };

            return this.http(originalRequest);
        } catch (err) {
            this.rejectQueue(err);
            // store.dispatch(Actions.Logout.request());
            return Promise.reject(err);
        } finally {
            this.isRefreshing = false;
        }
    }

    private requestNewAccessToken(): Promise<string> {
        return new Promise((_resolve: any, reject) => {
            // const unsubscribe = store.subscribe(() => {
            //     const {auth} = store.getState() as Types.IState;
            //
            //     if (auth.accessToken) {
            //         unsubscribe();
            //         resolve(auth.accessToken);
            //     }
            // });

            // store.dispatch(Actions.AccessToken.request());

            setTimeout(() => {
                // unsubscribe();
                reject(new Error('Refresh token timeout'));
            }, 15000);
        });
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

        const notification = {
            info: 'info',
            warning: 'warning',
            error: 'error',
        }

        const map: any = {
            [MESSAGE_TYPE.INFO]: notification.info,
            [MESSAGE_TYPE.WARNING]: notification.warning,
            [MESSAGE_TYPE.ERROR]: notification.error,
        };

        map[type]?.({message: code});
    }

    /* ================= PUBLIC ================= */

    private get http(): AxiosInstance {
        if (!this.instance) {
            this.instance = this.createInstance();
        }
        return this.instance;
    }

    public get request(): AxiosInstance {
        return this.http;
    }
}

export default new Http();
