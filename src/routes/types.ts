// src/routes/types.ts
import { RouteMatch } from '@tanstack/react-router';

export type AppRoutePaths = RouteMatch<typeof routeTree>;

export interface RouteParams {
  userId?: string;
  postId?: string;
}

export interface RouteSearch {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
}