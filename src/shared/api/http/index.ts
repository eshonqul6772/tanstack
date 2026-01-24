import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

type AuthHandlers = {
  getToken: () => string | undefined;
  onLogout: () => void;
};

type InitOptions = {
  baseURL?: string;
};

let authHandlers: AuthHandlers | null = null;

export const setAuthHandlers = (handlers: AuthHandlers): void => {
  authHandlers = handlers;
};

class Http {
  private instance: AxiosInstance | null = null;

  public init(options: InitOptions = {}): AxiosInstance {
    if (this.instance) return this.instance;

    this.instance = axios.create({
      baseURL: options.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor
    this.instance.interceptors.request.use(config => {
      const token = authHandlers?.getToken?.();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    this.instance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          authHandlers?.onLogout?.();
        }
        return Promise.reject(error);
      }
    );

    return this.instance;
  }

  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance!.get<T>(url, config);
  }

  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance!.post<T>(url, data, config);
  }

  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance!.put<T>(url, data, config);
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance!.patch<T>(url, data, config);
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance!.delete<T>(url, config);
  }
}

export default new Http();
