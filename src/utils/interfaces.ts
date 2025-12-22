import { STATUS } from '@/utils/enums';

export interface IParams {
  page?: number;
  perPage?: number;
  sort?: ISort;
  filter?: IFilter[];
}

export type TSortItem = number | string;

export interface ISort {
  name?: string | boolean;
  direction?: 'asc' | 'desc';
}

export interface IFilter {
  key: string;
  operation: '>' | '>=' | '<' | '<=' | '=' | '!=' | '%_%' | '%_' | '_%' | 'in';
  value: number | string | boolean | null | undefined | string[] | number[];
  type:
    | 'NUMBER'
    | 'STRING'
    | 'BOOLEAN'
    | 'JSON'
    | 'DATE'
    | 'LOCAL_DATE'
    | 'LOCAL_DATE_TIME'
    | 'ENUM_COLLECTION';
}

export interface IMeta {
  totalPages: number;
  totalItems: number;
  current: number;
  perPage: number;
}

export interface IFile {
  id: number;
  name: string;
  url: string;
  size: string;
  type: string;
  extension: string;
  uuid: string;
}

export interface IMultiName extends Record<string, string> {
  ru: string;
  uz: string;
  en: string;
}

export interface IIdAndMultiName {
  id: number | null;
  name: IMultiName;
}

export interface IIdAndName {
  id: number | null;
  name: string;
}

export interface IStatus {
  value: STATUS;
  variant: string;
}

export interface IAuditUser {
  createdBy: IActionBy;
  updatedBy: IActionBy;
  createdAt: string;
  updatedAt: string;
}

export interface IActionBy {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  status: STATUS;
}

export interface IMinFile {
  id: number;
  name: string;
  extension: string;
  url: string;
  uuid: string;
}
