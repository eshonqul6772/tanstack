type MultiName = {
  uz?: string;
  ru?: string;
  en?: string;
};

const isNonEmptyString = (value?: string) =>
  typeof value === 'string' && value.trim().length > 0;

export const MultiNameValidate = {
  isValidSync(value: MultiName) {
    return (
      isNonEmptyString(value?.uz) &&
      isNonEmptyString(value?.ru) &&
      isNonEmptyString(value?.en)
    );
  },
  validateSync(value: MultiName) {
    if (!this.isValidSync(value)) {
      throw new Error('Invalid multi-name');
    }
    return value;
  },
};
