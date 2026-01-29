import type React from 'react';
import { Loader } from '@mantine/core';

import { Form } from '@/entities/translation';
import * as Forms from '@/entities/translation/forms';

interface IProps {
  onCancel: () => void;
}

export const Create: React.FC<IProps> = ({ onCancel }) => {
  return (
    <Forms.Create onSuccess={() => onCancel()}>
      {form => (
        <>
          {form.submitting && <Loader color="blue" size="sm" />}
          <Form />
        </>
      )}
    </Forms.Create>
  );
};
