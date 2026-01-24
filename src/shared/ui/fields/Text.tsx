import React from 'react';
import {TextInput, TextInputProps} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {UseFormReturnType} from '@mantine/form';


interface IProps extends Omit<TextInputProps, 'value' | 'onChange' | 'form'> {
    name: string;
    form: UseFormReturnType<any>;
    onChange?: (value: string) => void;
    validation?: {
        required?: boolean;
        min?: number;
        max?: number;
    };
}

const Text: React.FC<IProps> = ({name, form, validation, onChange, ...props}) => {
    const {t} = useTranslation();

    return (
        <TextInput
            {...props}
            value={form.values[name] || ''}
            error={form.errors[name]}
            placeholder={props.placeholder || t('field_enter')}
            onChange={(event) => {
                const value = event.currentTarget.value;
                form.setFieldValue(name, value);
                onChange?.(value);
            }}
            onBlur={() => form.validateField(name)}
        />
    );
};

export default Text;
