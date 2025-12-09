// src/routes/dashboard.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
});

// Dashboard Home
export const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: () => <div>Dashboard Home</div>,
});

// Dashboard Analytics
export const dashboardAnalyticsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/analytics',
  component: () => <div>Analytics</div>,
});