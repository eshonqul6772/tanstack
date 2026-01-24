const ENV = import.meta.env;

const BASE_URL = ENV.VITE_APP_API_BASE_URL;

const config = {
  app: {
    env: ENV.VITE_APP_ENV,
    version: ENV.APP_VERSION,
    cabinet: ENV.VITE_APP_CABINET,
    isDev: ENV.VITE_APP_ENV !== 'production',
    editorApiKey: ENV.VITE_APP_EDITOR_API_KEY
  },
  api: {
    baseUrl: BASE_URL + '/user/v1'
  },
  sentry: {
    dsn: ENV.VITE_APP_SENTRY_DSN
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
