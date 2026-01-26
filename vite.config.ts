import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL)
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 5173,
      open: true,
      cors: true
    },
    build: {
      target: 'ES2022',
      minify: 'terser',
      sourcemap: mode !== 'production'
    }
  };
});
