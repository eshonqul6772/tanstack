import { NumberInput, type NumberInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { useFormContext } from './FormProvider';
import type { NumberFieldName } from './types';

interface IProps<T extends Record<string, any>> extends Omit<NumberInputProps, 'value' | 'onChange' | 'form'> {
  name: NumberFieldName<T>;
  form?: UseFormReturnType<T>;
  onChange?: (value: number | null) => void;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

const NumberInputField = <T extends Record<string, any>>({ name, form, validation, onChange, ...props }: IProps<T>) => {
  const { t } = useTranslation();
  const contextForm = useFormContext<T>();
  const currentForm = form ?? contextForm;
  if (!currentForm) {
    throw new Error('Number field must be used inside FormProvider or receive form prop.');
  }

  const rawValue = currentForm.values[name];
  const inputValue = rawValue === undefined || rawValue === null ? '' : Number(rawValue);

  return (
    <NumberInput
      {...props}
      value={inputValue}
      error={currentForm.errors[name]}
      placeholder={props.placeholder || t('field_enter')}
      onChange={value => {
        const nextValue = typeof value === 'number' && !Number.isNaN(value) ? value : null;
        currentForm.setFieldValue(name, nextValue as T[typeof name]);
        onChange?.(nextValue);
      }}
      onBlur={() => currentForm.validateField(name)}
    />
  );
};

export default NumberInputField;
