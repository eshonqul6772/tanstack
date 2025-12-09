// src/routes/settings.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import SettingsLayout from '@/pages/settings/SettingsLayout';

export const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsLayout,
});

// Account settings
export const settingsAccountRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/account',
  component: () => <div>Account Settings</div>,
});

// Notification settings
export const settingsNotificationsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/notifications',
  component: () => <div>Notification Settings</div>,
});