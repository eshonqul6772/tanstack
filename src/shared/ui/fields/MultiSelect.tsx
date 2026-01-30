import { useTranslation } from 'react-i18next';
import { MultiSelect as MantineMultiSelect, type MultiSelectProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import get from 'lodash/get';

import useValidatedField, { type ValidationRules } from './utils/useValidatedField.ts';

interface IProps<T> extends Omit<MultiSelectProps, 'value' | 'onChange' | 'form'> {
  name: keyof T & string;
  form?: UseFormReturnType<T>;
  onChange?: (value: string[]) => void;
  validation?: ValidationRules;
}

const MultiSelect = <T,>({ name, form, validation, onChange, ...props }: IProps<T>) => {
  const { t } = useTranslation();
  const {
    currentForm,
    value: selectValue,
    error,
    handleBlur
  } = useValidatedField<T, string[]>({
    name,
    form,
    validation,
    fieldLabel: 'MultiSelect',
    getValue: formState => {
      const rawValue = get(formState.values, name);
      return Array.isArray(rawValue) ? rawValue.map(item => String(item)) : [];
    }
  });

  return (
    <MantineMultiSelect
      {...props}
      value={selectValue}
      error={error}
      placeholder={props.placeholder || t('field_select')}
      onChange={value => {
        // @ts-expect-error
        currentForm.setFieldValue(name, value);
        if (validation) currentForm.setFieldError(name, null);
        onChange?.(value);
      }}
      onBlur={handleBlur}
    />
  );
};

export default MultiSelect;
