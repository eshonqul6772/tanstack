import { createRoot } from 'react-dom/client';

import '@/shared/assets/style/main.scss';
import '@/shared/assets/style/tailwind.css';

import * as Providers from '@/app/providers';
import * as AuthProviders from '@/features/auth/providers';

import 'tailwindcss';

createRoot(document.getElementById('root')!).render(
  <Providers.QueryProvider>
    <Providers.MantineProvider>
      <AuthProviders.AuthProvider>
        <Providers.RouterProvider />
      </AuthProviders.AuthProvider>
    </Providers.MantineProvider>
  </Providers.QueryProvider>
);
