import { TextInput, type TextInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';

import { useFormContext } from './FormProvider';
import type { StringFieldName } from './types';

interface IProps<T extends Record<string, any>> extends Omit<TextInputProps, 'value' | 'onChange' | 'form'> {
  name: StringFieldName<T>;
  form?: UseFormReturnType<T>;
  mask: string;
  maskChar?: string;
  alwaysShowMask?: boolean;
  onChange?: (value: string) => void;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

const Mask = <T extends Record<string, any>>({
  name,
  form,
  mask,
  maskChar,
  alwaysShowMask,
  validation,
  onChange,
  ...props
}: IProps<T>) => {
  const { t } = useTranslation();
  const contextForm = useFormContext<T>();
  const currentForm = form ?? contextForm;
  if (!currentForm) {
    throw new Error('Mask field must be used inside FormProvider or receive form prop.');
  }

  const rawValue = currentForm.values[name];
  const inputValue = rawValue === undefined || rawValue === null ? '' : String(rawValue);

  return (
    <InputMask
      mask={mask}
      maskChar={maskChar}
      alwaysShowMask={alwaysShowMask}
      value={inputValue}
      onChange={event => {
        const value = event.currentTarget.value;
        // @ts-expect-error
        currentForm.setFieldValue(name, value);
        onChange?.(value);
      }}
    >
      {(inputProps: any) => (
        <TextInput
          {...props}
          {...inputProps}
          error={currentForm.errors[name]}
          placeholder={props.placeholder || t('field_enter')}
          onBlur={() => currentForm.validateField(name)}
        />
      )}
    </InputMask>
  );
};

export default Mask;
