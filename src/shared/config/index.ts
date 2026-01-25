const ENV = import.meta.env;

// API Base URL - environment o'zgaruvchilardan
const API_BASE_URL = ENV.VITE_API_BASE_URL || 'https://hudud.adliya.uz/api/v1';
const APP_ENV = ENV.VITE_APP_ENV || 'development';
const APP_DEBUG = ENV.VITE_APP_DEBUG === 'true';
const LOG_LEVEL = ENV.VITE_APP_LOG_LEVEL || 'info';

const config = {
  app: {
    env: APP_ENV,
    isDev: APP_ENV === 'local' || APP_ENV === 'development',
    isProd: APP_ENV === 'production',
    debug: APP_DEBUG,
    logLevel: LOG_LEVEL,
    version: '1.0.0'
  },
  api: {
    baseUrl: API_BASE_URL
  },
  language: {
    key: 'language',
    initial: 'uz',
    list: ['uz', 'ru', 'en']
  },
  list: {
    perPage: 10
  }
};

export default config;
