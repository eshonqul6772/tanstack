// src/routes/routeTree.ts
import { rootRoute } from './__root';
import { indexRoute } from './index';
import { aboutRoute } from './about';
import { userProfileRoute } from './users.$userId';
import { settingsRoute, settingsAccountRoute, settingsNotificationsRoute } from './settings';
import { dashboardRoute, dashboardIndexRoute, dashboardAnalyticsRoute } from './dashboard';
import { notFoundRoute } from './__not-found';
import { authRoute, loginRoute, registerRoute } from './auth';

// Route tree yaratish
export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  userProfileRoute,
  
  // Settings route tree
  settingsRoute.addChildren([
    settingsAccountRoute,
    settingsNotificationsRoute,
  ]),
  
  // Dashboard route tree
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    dashboardAnalyticsRoute,
  ]),
  
  // Auth route tree
  authRoute.addChildren([
    loginRoute,
    registerRoute,
  ]),
  
  // 404 route oxirida bo'lishi kerak
  notFoundRoute,
]);

// Export qilish
export default routeTree;