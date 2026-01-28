import type React from 'react';
import { createContext, useContext } from 'react';
import type { UseFormReturnType } from '@mantine/form';

type FormContextValue<T> = UseFormReturnType<T> | null;

const FormContext = createContext<FormContextValue<any>>(null);

interface FormProviderProps<T> {
  form: UseFormReturnType<T>;
  children: React.ReactNode;
}

const FormProvider = <T,>({ form, children }: FormProviderProps<T>) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

const useFormContext = <T,>() => {
  return useContext(FormContext) as FormContextValue<T>;
};

export { FormProvider, useFormContext };
