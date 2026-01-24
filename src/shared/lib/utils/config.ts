import type { TSortItem } from './interfaces';

export function sort(a: TSortItem, b: TSortItem): number {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}
