import type { UseFormReturnType } from '@mantine/form';
import get from 'lodash/get';

import type { StringFieldName } from './types.ts';
import useFieldForm from './useFieldForm.ts';

interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
}

interface Args<T extends Record<string, any>> {
  name: StringFieldName<T>;
  form?: UseFormReturnType<T>;
  validation?: ValidationRules;
  fieldLabel: string;
}

const getValidationError = (value: string, validation?: ValidationRules) => {
  if (!validation) return null;
  if (validation.required && !value) return 'Required';
  if (validation.min !== undefined && value.length < validation.min) return `Min ${validation.min}`;
  if (validation.max !== undefined && value.length > validation.max) return `Max ${validation.max}`;
  return null;
};

const useTextField = <T extends Record<string, any>>({ name, form, validation, fieldLabel }: Args<T>) => {
  const currentForm = useFieldForm<T>(form, fieldLabel);

  const rawValue = get(currentForm.values, name);
  const inputValue = rawValue === undefined || rawValue === null ? '' : String(rawValue);
  const formError = get(currentForm.errors, name);
  const isTouched = currentForm.isTouched ? currentForm.isTouched(name) : false;
  const shouldValidate = Boolean(validation) && (isTouched || Boolean(formError));
  const validationError = shouldValidate ? getValidationError(inputValue, validation) : null;
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
      const nextValue = String(get(currentForm.values, name) ?? '');
      currentForm.setFieldError(name, getValidationError(nextValue, validation));
    } else {
      currentForm.validateField(name);
    }
  };

  return { currentForm, inputValue, error, handleBlur };
};

export default useTextField;
