import type React from 'react';
import get from 'lodash/get';

import { useFormContext } from './fields/FormProvider';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.tsx';

interface IProps {
  disabled?: boolean;
  active: string;
  short?: boolean;
  onChange: (value: string) => void;
  fields: string[];
  languages?: { title: string; value: string }[];
}

const langs = [
  { title: 'O’zbekcha', value: 'uz' },
  { title: 'Русский', value: 'ru' },
  { title: 'English', value: 'en' }
];

const FormLanguageSwitcher: React.FC<IProps> = ({
  fields,
  short,
  active,
  onChange,
  disabled = false,
  languages = langs
}) => {
  const form = useFormContext<any>();
  const errors = form?.errors;

  const errorsCountByLanguage = languages.reduce<Record<string, number>>((prev, language) => {
    const count = fields.reduce((acc, field) => {
      const path = `${field}[${language.value}]`;
      const hasError = Boolean(get(errors, path));
      const isTouched = form?.isTouched ? form.isTouched(path) : false;
      return acc + Number(hasError && isTouched);
    }, 0);

    return {
      ...prev,
      [language.value]: count
    };
  }, {});

  return (
    <div
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.4 : 1
      }}
    >
      <LanguageSwitcher
        {...{ active, onChange }}
        options={languages.map(({ title, ...props }) => ({
          ...props,
          ...(short ? { title: props.value?.toUpperCase() } : { title }),
          badge: errorsCountByLanguage[props.value]
        }))}
      />
    </div>
  );
};

export default FormLanguageSwitcher;
