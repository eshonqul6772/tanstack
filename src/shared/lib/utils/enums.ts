export const MESSAGE_TYPE = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
} as const;
export type MESSAGE_TYPE = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED'
} as const;
export type STATUS = (typeof STATUS)[keyof typeof STATUS];

export const STATUS_VARIANT = {
  [STATUS.ACTIVE]: 'blue',
  [STATUS.INACTIVE]: 'red',
  [STATUS.DELETED]: 'red'
} as const;

export const BOOLEAN = {
  TRUE: 'TRUE',
  FALSE: 'FALSE'
} as const;
export type BOOLEAN = (typeof BOOLEAN)[keyof typeof BOOLEAN];

export const CABINET_TYPE = {
  ADMIN_CABINET: 'ADMIN_CABINET',
  CLIENT_CABINET: 'CLIENT_CABINET'
} as const;
export type CABINET_TYPE = (typeof CABINET_TYPE)[keyof typeof CABINET_TYPE];

export const LANGUAGE = {
  UZ: 'oz',
  AR: 'ar'
} as const;
export type LANGUAGE = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export const FILE_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  FILE: 'FILE'
} as const;
export type FILE_TYPE = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

export const MONTH = {
  JANUARY: 'JANUARY',
  FEBRUARY: 'FEBRUARY',
  MARCH: 'MARCH',
  APRIL: 'APRIL',
  MAY: 'MAY',
  JUNE: 'JUNE',
  JULY: 'JULY',
  AUGUST: 'AUGUST',
  SEPTEMBER: 'SEPTEMBER',
  OCTOBER: 'OCTOBER',
  NOVEMBER: 'NOVEMBER',
  DECEMBER: 'DECEMBER'
} as const;
export type MONTH = (typeof MONTH)[keyof typeof MONTH];

export const DAY_OF_WEEK = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
} as const;
export type DAY_OF_WEEK = (typeof DAY_OF_WEEK)[keyof typeof DAY_OF_WEEK];

export const PERMISSIONS = {
  VIEW_USERS: 'VIEW_USERS',
  VIEW_USER: 'VIEW_USER',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',

  VIEW_ROLES: 'VIEW_ROLES',
  VIEW_ROLE: 'VIEW_ROLE',
  CREATE_ROLE: 'CREATE_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',
  VIEW_TRANSLATIONS: 'VIEW_TRANSLATIONS',
  VIEW_TRANSLATION: 'VIEW_TRANSLATION',
  CREATE_TRANSLATION: 'CREATE_TRANSLATION',
  UPDATE_TRANSLATION: 'UPDATE_TRANSLATION',
  DELETE_TRANSLATION: 'DELETE_TRANSLATION'
} as const;
export type PERMISSIONS = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
