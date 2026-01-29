import type React from 'react';
import cx from 'classnames';

import cls from './LanguageSwitcher.module.scss';

interface IOption {
  title: string;
  value: string;
  badge?: number;
}

interface IProps {
  active: string;
  options: IOption[];
  onChange: (value: string) => void;
}

const LanguageSwitcher: React.FC<IProps> = ({ active, options, onChange }) => (
  <div className={cls.wrapper}>
    {options.map(option => (
      <button
        key={option.value}
        type="button"
        className={cx(cls.option, option.value === active && cls.optionActive, option.badge && cls.optionHasBadge)}
        onClick={() => onChange(option.value)}
        aria-pressed={option.value === active}
      >
        <div className={cx(cls.optionFlag, cls[`optionFlag--${option.value}`])} />
        <div className={cls.optionValue}>{option.title}</div>
        {!!option.badge && <div className={cls.optionBadge}>{option.badge}</div>}
      </button>
    ))}
  </div>
);

export default LanguageSwitcher;
