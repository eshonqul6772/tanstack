import type React from 'react';
import { Loader } from '@mantine/core';

import { Form, useSingle } from '@/entities/translation';
import * as Forms from '@/entities/translation/forms';

interface IProps {
  id: number;
  onCancel: () => void;
}

export const Update: React.FC<IProps> = ({ id, onCancel }) => {
  const { item, isFetching } = useSingle({ id });

  return (
    <>
      {isFetching && <Loader color="blue" size="sm" />}
      {item && (
        <Forms.Update id={id} values={item} onSuccess={onCancel}>
          {form => (
            <>
              {form.submitting && <Loader color="blue" size="sm" />}
              <Form onCancel={onCancel} />
            </>
          )}
        </Forms.Update>
      )}
    </>
  );
};
