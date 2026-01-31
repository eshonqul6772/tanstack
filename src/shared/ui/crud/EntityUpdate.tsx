import type { ComponentType, ReactElement } from 'react';
import { Loader } from '@mantine/core';

type FormRenderProps = { submitting: boolean };

interface UpdateWrapperProps<TValues, TForm extends FormRenderProps> {
  id: number;
  values: TValues;
  onSuccess?: () => void;
  children: (form: TForm) => ReactElement;
}

interface UseSingleResult<TItem> {
  item?: TItem;
  isFetching: boolean;
}

interface Props<TItem, TValues, TForm extends FormRenderProps> {
  id: number;
  onCancel: () => void;
  useSingle: (args: { id: number }) => UseSingleResult<TItem>;
  UpdateWrapper: ComponentType<UpdateWrapperProps<TValues, TForm>>;
  FormComponent: ComponentType<{ onCancel: () => void }>;
  mapValues?: (item: TItem) => TValues;
}

export const EntityUpdate = <TItem, TValues, TForm extends FormRenderProps>({
  id,
  onCancel,
  useSingle,
  UpdateWrapper,
  FormComponent,
  mapValues
}: Props<TItem, TValues, TForm>) => {
  const { item, isFetching } = useSingle({ id });
  const mappedValues = item ? (mapValues ? mapValues(item) : (item as unknown as TValues)) : undefined;

  return (
    <>
      {isFetching && <Loader color="blue" size="sm" />}
      {item && mappedValues && (
        <UpdateWrapper id={id} values={mappedValues} onSuccess={onCancel}>
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
