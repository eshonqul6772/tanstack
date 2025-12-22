// modules/auth/forms/Login.tsx
import React from 'react';
import { Form, Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';
import * as Actions from '../actions';
import AuthContext from '@/providers/AuthProvider';

const Login: React.FC<{ children: any }> = ({ children }) => {
  const { dispatch } = AuthContext();

  const mutation = useMutation<Types.IEntity.Token, string, Types.IForm.Login>({
    mutationFn: async values => {
      const { data } = await Api.Login({ values });
      return Mappers.getToken(data?.data);
    },
    onSuccess: (token:any) => {
      dispatch(Actions.Login.success(token));
    },
  });

  return (
      <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, helpers) => {
            mutation.mutate(values, {
              onSettled: () => helpers.setSubmitting(false),
            });
          }}
      >
        {props => <Form>{children(props)}</Form>}
      </Formik>
  );
};

export default Login;
