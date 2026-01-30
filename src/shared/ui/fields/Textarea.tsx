import { useTranslation } from 'react-i18next';
import { Textarea as MantineTextarea, type TextareaProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import get from 'lodash/get';

import { useFormContext } from './FormProvider';
import type { StringFieldName } from './types';

interface IProps<T extends Record<string, any>> extends Omit<TextareaProps, 'value' | 'onChange' | 'form'> {
  name: StringFieldName<T>;
  form?: UseFormReturnType<T>;
  onChange?: (value: string) => void;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

const Textarea = <T extends Record<string, any>>({ name, form, validation, onChange, ...props }: IProps<T>) => {
  const { t } = useTranslation();
  const contextForm = useFormContext<T>();
  const currentForm: any = form ?? contextForm;
  if (!currentForm) {
    throw new Error('Textarea field must be used inside FormProvider or receive form prop.');
  }

  const rawValue = get(currentForm.values, name);
  const inputValue = rawValue === undefined || rawValue === null ? '' : String(rawValue);
  const isTouched = currentForm.isTouched ? currentForm.isTouched(name) : false;
  const shouldValidate = Boolean(validation) && (isTouched || Boolean(get(currentForm.errors, name)));
  const validationError = (() => {
    if (!validation || !shouldValidate) return null;
    if (validation.required && !inputValue) return 'Required';
    if (validation.min !== undefined && inputValue.length < validation.min) return `Min ${validation.min}`;
    if (validation.max !== undefined && inputValue.length > validation.max) return `Max ${validation.max}`;
    return null;
  })();

  return (
    <MantineTextarea
      {...props}
      value={inputValue}
      error={get(currentForm.errors, name) || validationError}
      placeholder={props.placeholder || t('field_enter')}
      onChange={event => {
        const value = event.currentTarget.value;
        currentForm.setFieldValue(name, value);
        if (validation) currentForm.setFieldError(name, null);
        onChange?.(value);
      }}
      onBlur={() => {
        if (validation) {
          currentForm.setFieldTouched(name, true);
          const nextValue = String(get(currentForm.values, name) ?? '');
          let error: string | null = null;
          if (validation.required && !nextValue) error = 'Required';
          else if (validation.min !== undefined && nextValue.length < validation.min) error = `Min ${validation.min}`;
          else if (validation.max !== undefined && nextValue.length > validation.max) error = `Max ${validation.max}`;
          currentForm.setFieldError(name, error);
        } else {
          currentForm.validateField(name);
        }
      }}
    />
  );
};

export default Textarea;
