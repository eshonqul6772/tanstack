import axios, {
  type AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';

import { MESSAGE_TYPE } from '@/shared/lib/utils/enums';

type AuthHandlers = {
  getToken: () => string | undefined;
  onLogout: () => void;
};

type InitOptions = {
  config?: AxiosRequestConfig;
  configFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
};

type NotificationPayload = {
  code?: string;
  type?: string;
};

const defaultConfig: AxiosRequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

let authHandlers: AuthHandlers | null = null;

export const setAuthHandlers = (handlers: AuthHandlers): void => {
  authHandlers = handlers;
};

const getAuthHandlers = (): AuthHandlers | null => authHandlers;

class Http {
  private instance: AxiosInstance | null = null;
  private configFn: InitOptions['configFn'] | null = null;

  public init(options: InitOptions = {}): AxiosInstance {
    if (this.instance) {
      if (options.configFn) {
        this.configFn = options.configFn;
      }
      return this.instance;
    }

    this.configFn = options.configFn ?? null;
    this.instance = axios.create({
      ...defaultConfig,
      ...options.config
    });

    this.setupInterceptors();

    return this.instance;
  }

  private setupInterceptors(): void {
    if (!this.instance) return;

    this.instance.interceptors.request.use(this.handleRequest, error => Promise.reject(error));

    this.instance.interceptors.response.use(
      response => response,
      error => this.handleResponseError(error)
    );
  }

  private handleRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const baseHeaders = AxiosHeaders.from(config.headers);
    config.headers = baseHeaders;

    const handlers = getAuthHandlers();
    const token = handlers?.getToken?.();

    if (token) {
      baseHeaders.set('Authorization', `Bearer ${token}`);
    }

    if (this.configFn) {
      const modifiedConfig = await this.configFn(config);
      const mergedHeaders = modifiedConfig.headers
        ? AxiosHeaders.from({
            ...baseHeaders.toJSON(),
            ...AxiosHeaders.from(modifiedConfig.headers).toJSON()
          })
        : baseHeaders;

      return { ...config, ...modifiedConfig, headers: mergedHeaders };
    }

    return config;
  };

  private async handleResponseError(error: AxiosError): Promise<never> {
    const response = error.response;

    if (response?.data) {
      this.showNotification(response.data);
    }

    if (response?.status === 401) {
      this.handleUnauthorized();
    }

    return Promise.reject(error);
  }

  private handleUnauthorized(): void {
    const handlers = getAuthHandlers();
    handlers?.onLogout?.();
  }

  private showNotification(data: unknown): void {
    if (!data || typeof data !== 'object') return;

    const { code, type } = data as NotificationPayload;

    if (!code || !type) return;

    const notificationMap: Record<string, (message: string) => void> = {
      [MESSAGE_TYPE.INFO]: console.info,
      [MESSAGE_TYPE.WARNING]: console.warn,
      [MESSAGE_TYPE.ERROR]: console.error
    };

    const notifyFn = notificationMap[type];
    if (notifyFn) {
      notifyFn(code);
    }
  }

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

export default new Http();
