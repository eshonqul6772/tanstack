import type { ComponentType, ReactElement } from 'react';
import { Loader } from '@mantine/core';

type FormRenderProps = { submitting: boolean };

interface UpdateWrapperProps<TValues, TForm extends FormRenderProps> {
  id: number;
  values: TValues;
  onSuccess?: () => void;
  children: (form: TForm) => ReactElement;
}

interface UseSingleResult<TValues> {
  item?: TValues;
  isFetching: boolean;
}

interface Props<TValues, TForm extends FormRenderProps> {
  id: number;
  onCancel: () => void;
  useSingle: (args: { id: number }) => UseSingleResult<TValues>;
  UpdateWrapper: ComponentType<UpdateWrapperProps<TValues, TForm>>;
  FormComponent: ComponentType<{ onCancel: () => void }>;
}

export const EntityUpdate = <TValues, TForm extends FormRenderProps>({
  id,
  onCancel,
  useSingle,
  UpdateWrapper,
  FormComponent
}: Props<TValues, TForm>) => {
  const { item, isFetching } = useSingle({ id });

  return (
    <>
      {isFetching && <Loader color="blue" size="sm" />}
      {item && (
        <UpdateWrapper id={id} values={item} onSuccess={onCancel}>
          {form => (
            <>
              {form.submitting && <Loader color="blue" size="sm" />}
              <FormComponent onCancel={onCancel} />
            </>
          )}
        </UpdateWrapper>
      )}
    </>
  );
};
