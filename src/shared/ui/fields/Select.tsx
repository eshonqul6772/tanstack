import type React from 'react';
import { Select as MantineSelect, type SelectProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { useFormContext } from './FormProvider';

interface IProps<T> extends Omit<SelectProps, 'value' | 'onChange' | 'form'> {
  name: keyof T & string;
  form?: UseFormReturnType<T>;
  onChange?: (value: string | null) => void;
  validation?: {
    required?: boolean;
  };
}

const Select = <T,>({
  name,
  form,
  validation,
  onChange,
  ...props
}: IProps<T>) => {
  const { t } = useTranslation();
  const contextForm = useFormContext<T>();
  const currentForm = form ?? contextForm;
  if (!currentForm) {
    throw new Error('Select field must be used inside FormProvider or receive form prop.');
  }

  const rawValue = currentForm.values[name];
  const selectValue = rawValue === undefined || rawValue === null ? null : String(rawValue);

  return (
    <MantineSelect
      {...props}
      value={selectValue}
      error={currentForm.errors[name]}
      placeholder={props.placeholder || t('field_select')}
      onChange={value => {
        currentForm.setFieldValue(name, value);
        onChange?.(value);
      }}
      onBlur={() => currentForm.validateField(name)}
    />
  );
};

export default Select;
