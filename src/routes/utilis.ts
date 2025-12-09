// src/routes/utils.ts
import { createLink, useNavigate } from '@tanstack/react-router';

export const createAppLink = createLink;

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return navigate;
};

export const buildRoute = (path: string, params?: Record<string, string>) => {
  let route = path;
  if (params) {
    Object.keys(params).forEach(key => {
      route = route.replace(`$${key}`, params[key]);
    });
  }
  return route;
};