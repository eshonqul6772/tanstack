export const ENTITY = 'AUTH';

export const LOGIN = {
  REQUEST: '@@AUTH/LOGIN/REQUEST',
  SUCCESS: '@@AUTH/LOGIN/SUCCESS'
} as const;

export const PROFILE = {
  REQUEST: '@@AUTH/PROFILE/REQUEST',
  SUCCESS: '@@AUTH/PROFILE/SUCCESS'
} as const;

export const LOGOUT = {
  REQUEST: '@@AUTH/LOGOUT/REQUEST',
  SUCCESS: '@@AUTH/LOGOUT/SUCCESS'
} as const;
