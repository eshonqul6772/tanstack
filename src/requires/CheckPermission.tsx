import React from 'react';

import {PERMISSIONS} from '@/utils/enums';

import * as Hooks from '@/modules/auth/hooks';

import NoAccess from '@/pages/NoAccess';

interface IProps {
    permission: PERMISSIONS;
    page: React.ReactNode;
}

const CheckPermission: React.FC<IProps> = ({permission, page}) => {
    const {profile} = Hooks.useAuth();

    if (profile.permissions.includes(permission)) return page;

    return <NoAccess/>;
};

export default CheckPermission;