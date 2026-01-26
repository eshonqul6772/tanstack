import { TextInput, type TextInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps extends Omit<TextInputProps, 'value' | 'onChange' | 'form'> {
  name: string;
  form: UseFormReturnType<Record<string, string | number | null | undefined>>;
  onChange?: (value: string) => void;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

const Text: React.FC<IProps> = ({ name, form, validation, onChange, ...props }) => {
  const { t } = useTranslation();
  const rawValue = form.values[name];
  const inputValue = rawValue === undefined || rawValue === null ? '' : String(rawValue);

  return (
    <TextInput
      {...props}
      value={inputValue}
      error={form.errors[name]}
      placeholder={props.placeholder || t('field_enter')}
      onChange={event => {
        const value = event.currentTarget.value;
        form.setFieldValue(name, value);
        onChange?.(value);
      }}
      onBlur={() => form.validateField(name)}
    />
  );
};

export default Text;
