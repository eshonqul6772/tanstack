import type { ComponentType, ReactElement } from 'react';
import { Loader } from '@mantine/core';

type FormRenderProps = { submitting: boolean };

interface CreateWrapperProps<TForm extends FormRenderProps> {
  onSuccess?: () => void;
  children: (form: TForm) => ReactElement;
}

interface Props<TForm extends FormRenderProps> {
  onCancel: () => void;
  CreateWrapper: ComponentType<CreateWrapperProps<TForm>>;
  FormComponent: ComponentType<{ onCancel: () => void }>;
}

export const EntityCreate = <TForm extends FormRenderProps>({
  onCancel,
  CreateWrapper,
  FormComponent
}: Props<TForm>) => {
  return (
    <CreateWrapper onSuccess={onCancel}>
      {form => (
        <>
          {form.submitting && <Loader color="blue" size="sm" />}
          <FormComponent onCancel={onCancel} />
        </>
      )}
    </CreateWrapper>
  );
};
