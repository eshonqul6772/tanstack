import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import get from 'lodash/get';

import { useAuth } from '@/providers/AuthProvider';
import * as Actions from '@/modules/auth/actions';
import { MESSAGE_TYPE } from '@/utils/enums';

// ================= TYPES =================

type AuthStore = ReturnType<typeof useAuth>;

type InitOptions = {
    config?: AxiosRequestConfig;
    configFn?: (
        config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
};

type RefreshQueueItem = {
    resolve: (value: any) => void;
    reject: (error: unknown) => void;
};

// ================= CONSTANTS =================

const StatusCode = {
    Unauthorized: 401,
    Forbidden: 403,
    TooManyRequests: 429,
    InternalServerError: 500,
} as const;

const REFRESH_TOKEN_URL = 'refresh-token';

// ================= STORE MANAGEMENT =================

let authStore: AuthStore | null = null;

export const setAuthStore = (store: AuthStore): void => {
    authStore = store;
};

const getAuthStore = (): AuthStore => {
    if (!authStore) {
        throw new Error('Auth store is not initialized. Call setAuthStore() first.');
    }
    return authStore;
};

// ================= HTTP SERVICE =================

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

    // ================= INITIALIZATION =================

    public init(options: InitOptions = {}): AxiosInstance {
        if (this.instance) {
            return this.instance;
        }

        this.instance = axios.create({
            ...this.defaultConfig,
            ...options.config,
        });

        this.setupInterceptors(options.configFn);

        return this.instance;
    }

    // ================= INTERCEPTORS =================

    private setupInterceptors(configFn?: InitOptions['configFn']): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            async (config) => {
                // Ensure headers object exists
                if (!config.headers) {
                    config.headers = {};
                }

                // Add token from authStore to every request
                try {
                    const store = getAuthStore();
                    const token = store?.state?.token;

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    // Auth store not initialized yet, continue without token
                }

                // Apply custom config function if provided
                if (configFn) {
                    const modifiedConfig = await configFn(config);
                    return { ...config, ...modifiedConfig };
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => this.handleResponseError(error)
        );
    }

    // ================= ERROR HANDLING =================

    private async handleResponseError(error: AxiosError): Promise<any> {
        const { response, config } = error;

        if (response?.data) {
            this.showNotification(response.data);
        }

        if (response?.status === StatusCode.Unauthorized && config) {
            return this.handleUnauthorized(config);
        }

        this.handleCommonErrors(response?.status);
        return Promise.reject(error);
    }

    private handleCommonErrors(status?: number): void {
        switch (status) {
            case StatusCode.Forbidden:
                // Handle forbidden error
                break;
            case StatusCode.TooManyRequests:
                // Handle rate limit error
                break;
            case StatusCode.InternalServerError:
                // Handle server error
                break;
            default:
                break;
        }
    }

    // ================= TOKEN REFRESH =================

    private async handleUnauthorized(originalRequest: AxiosRequestConfig): Promise<any> {
        const store = getAuthStore();

        // Prevent infinite loop on refresh token endpoint
        if (originalRequest.url?.includes(REFRESH_TOKEN_URL)) {
            store.dispatch(Actions.Logout.request());
            return Promise.reject(new Error('Session expired'));
        }

        // If already refreshing, queue the request
        if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
                this.refreshQueue.push({
                    resolve: () => {
                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${store.state.token}`,
                        };
                        resolve(this.request(originalRequest));
                    },
                    reject,
                });
            });
        }

        this.isRefreshing = true;

        try {
            // Get new token from store
            const token = store.state.token;

            if (!token) {
                throw new Error('No token available');
            }

            // Resolve all queued requests
            this.resolveQueue();

            // Update original request with new token
            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
            };

            // Retry original request
            return await this.request(originalRequest);
        } catch (error) {
            // Reject all queued requests and logout
            this.rejectQueue(error);
            store.dispatch(Actions.Logout.request());
            return Promise.reject(error);
        } finally {
            this.isRefreshing = false;
        }
    }

    private resolveQueue(): void {
        this.refreshQueue.forEach((item) => item.resolve(null));
        this.refreshQueue = [];
    }

    private rejectQueue(error: unknown): void {
        this.refreshQueue.forEach((item) => item.reject(error));
        this.refreshQueue = [];
    }

    // ================= NOTIFICATIONS =================

    private showNotification(data: unknown): void {
        const code = get(data, 'code');
        const type = get(data, 'type');

        if (!code || !type) return;

        const notificationMap: Record<string, (message: string) => void> = {
            [MESSAGE_TYPE.INFO]: console.info,
            [MESSAGE_TYPE.WARNING]: console.warn,
            [MESSAGE_TYPE.ERROR]: console.error,
        };

        const notifyFn = notificationMap[type];
        if (notifyFn) {
            notifyFn(code);
        }
    }

    // ================= PUBLIC API =================

    public request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (!this.instance) {
            throw new Error('Http is not initialized. Call init() first.');
        }
        return this.instance.request<T>(config);
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}

// ================= EXPORT =================

export default new Http();