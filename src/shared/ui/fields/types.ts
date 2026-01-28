export type StringFieldName<T> = {
  [K in keyof T]-?: T[K] extends string | null | undefined ? K : never;
}[keyof T] &
  string;

export type NumberFieldName<T> = {
  [K in keyof T]-?: T[K] extends number | null | undefined ? K : never;
}[keyof T] &
  string;
