import type { UseFormReturnType } from '@mantine/form';

import { useFormContext } from '../FormProvider.tsx';

const useFieldForm = <T>(form: UseFormReturnType<T> | undefined, fieldLabel: string) => {
  const contextForm = useFormContext<T>();
  const currentForm = form ?? contextForm;

  if (!currentForm) {
    throw new Error(`${fieldLabel} field must be used inside FormProvider or receive form prop.`);
  }

  return currentForm;
};

export default useFieldForm;
