import { useTranslation } from 'react-i18next';
import { NumberInput, type NumberInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import get from 'lodash/get';

import type { NumberFieldName } from './utils/types.ts';
import useValidatedField, { type ValidationRules } from './utils/useValidatedField.ts';

interface IProps<T extends Record<string, any>> extends Omit<NumberInputProps, 'value' | 'onChange' | 'form'> {
  name: NumberFieldName<T>;
  form?: UseFormReturnType<T>;
  onChange?: (value: number | null) => void;
  validation?: ValidationRules;
}

const NumberInputField = <T extends Record<string, any>>({ name, form, validation, onChange, ...props }: IProps<T>) => {
  const { t } = useTranslation();
  const { currentForm, value, error, handleBlur } = useValidatedField<T, number | null>({
    name,
    form,
    validation,
    fieldLabel: 'Number',
    getValue: formState => {
      const rawValue = get(formState.values, name);
      if (rawValue === undefined || rawValue === null || rawValue === '') return null;
      const numericValue = Number(rawValue);
      return Number.isFinite(numericValue) ? numericValue : null;
    }
  });
  const inputValue = value ?? '';

  return (
    <NumberInput
      {...props}
      value={inputValue}
      error={error}
      placeholder={props.placeholder || t('field_enter')}
      onChange={value => {
        const nextValue = typeof value === 'number' && !Number.isNaN(value) ? value : null;
        currentForm.setFieldValue(name, nextValue as T[typeof name]);
        if (validation) currentForm.setFieldError(name, null);
        onChange?.(nextValue);
      }}
      onBlur={handleBlur}
    />
  );
};

export default NumberInputField;
