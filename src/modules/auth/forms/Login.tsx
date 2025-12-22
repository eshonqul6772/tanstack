import React from 'react';
import {useForm} from '@mantine/form';
import {useMutation} from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

export type IFormValues = Types.IForm.Login;

interface IProps {
    onSuccess?: (data: Types.IEntity.Token) => void;
    onError?: (error: string) => void;

    children(form: ReturnType<typeof useForm<IFormValues>>): React.JSX.Element;
}

const Login: React.FC<IProps> = ({onSuccess, onError, children}) => {
    const form = useForm<IFormValues>({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: value => (!value ? 'Required' : null),
            password: value => (!value ? 'Required' : null),
        },
    });

    const mutation = useMutation<Types.IEntity.Token, string, IFormValues>({
        mutationFn: async values => {
            const {data} = await Api.Login({values});
            return Mappers.getToken(data && data.data);
        },
        onSuccess,
        onError,
    });

    const handleSubmit = form.onSubmit(values => {
        mutation.mutate(values, {
            onSettled: () => form.setSubmitting(false),
        });
    });

    return <form onSubmit={handleSubmit}>{children(form)}</form>;
};

export default Login;
