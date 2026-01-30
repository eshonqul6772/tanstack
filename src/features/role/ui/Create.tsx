import type React from 'react';
import { Loader } from '@mantine/core';

import { Form } from '@/entities/role';
import * as Forms from '@/entities/role/forms';

interface IProps {
  onCancel: () => void;
}

export const Create: React.FC<IProps> = ({ onCancel }) => {
  return (
    <Forms.Create onSuccess={() => onCancel()}>
      {form => (
        <>
          {form.submitting && <Loader color="blue" size="sm" />}
          <Form onCancel={onCancel} />
        </>
      )}
    </Forms.Create>
  );
};
