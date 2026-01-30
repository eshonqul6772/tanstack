import type { UseFormReturnType } from '@mantine/form';
import get from 'lodash/get';

import useFieldForm from './useFieldForm.ts';

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
}

const isEmptyValue = (value: unknown) => {
  if (value === null || value === undefined || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

const getValidationError = (value: unknown, validation?: ValidationRules) => {
  if (!validation) return null;
  if (validation.required && isEmptyValue(value)) return 'Required';
  if (typeof value === 'number') {
    if (validation.min !== undefined && value < validation.min) return `Min ${validation.min}`;
    if (validation.max !== undefined && value > validation.max) return `Max ${validation.max}`;
  }
  if (typeof value === 'string') {
    if (validation.min !== undefined && value.length < validation.min) return `Min ${validation.min}`;
    if (validation.max !== undefined && value.length > validation.max) return `Max ${validation.max}`;
  }
  if (Array.isArray(value)) {
    if (validation.min !== undefined && value.length < validation.min) return `Min ${validation.min}`;
    if (validation.max !== undefined && value.length > validation.max) return `Max ${validation.max}`;
  }
  return null;
};

interface Args<T, V> {
  name: keyof T & string;
  form?: UseFormReturnType<T>;
  validation?: ValidationRules;
  fieldLabel: string;
  getValue: (form: UseFormReturnType<T>) => V;
}

const useValidatedField = <T, V>({ name, form, validation, fieldLabel, getValue }: Args<T, V>) => {
  const currentForm = useFieldForm<T>(form, fieldLabel);
  const value = getValue(currentForm);
  const formError = get(currentForm.errors, name);
  const isTouched = currentForm.isTouched ? currentForm.isTouched(name) : false;
  const shouldValidate = Boolean(validation) && (isTouched || Boolean(formError));
  const validationError = shouldValidate ? getValidationError(value, validation) : null;
  const error = formError || validationError;

  const markTouched = () => {
    if (typeof currentForm.setTouched === 'function') {
      currentForm.setTouched((current: Record<string, boolean>) => ({
        ...current,
        [String(name)]: true
      }));
    }
  };

  const handleBlur = () => {
    if (validation) {
      markTouched();
      const nextValue = getValue(currentForm);
      currentForm.setFieldError(name, getValidationError(nextValue, validation));
    } else {
      currentForm.validateField(name);
    }
  };

  return { currentForm, value, error, handleBlur };
};

export default useValidatedField;
