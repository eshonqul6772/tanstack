import { useTranslation } from 'react-i18next';
import { TextInput, type TextInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

import type { StringFieldName } from './utils/types.ts';
import useTextField from './utils/useTextField.ts';

interface IProps<T extends Record<string, any>> extends Omit<TextInputProps, 'value' | 'onChange' | 'form'> {
  name: StringFieldName<T>;
  form?: UseFormReturnType<T>;
  onChange?: (value: string) => void;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

const Text = <T extends Record<string, any>>({ name, form, validation, onChange, ...props }: IProps<T>) => {
  const { t } = useTranslation();
  const { currentForm, inputValue, error, handleBlur } = useTextField<T>({
    name,
    form,
    validation,
    fieldLabel: 'Text'
  });

  return (
    <TextInput
      {...props}
      value={inputValue}
      error={error}
      placeholder={props.placeholder || t('field_enter')}
      onChange={event => {
        const value = event.currentTarget.value;
        // @ts-expect-error
        currentForm.setFieldValue(name, value);
        if (validation) currentForm.setFieldError(name, null);
        onChange?.(value);
      }}
      onBlur={handleBlur}
    />
  );
};

export default Text;
