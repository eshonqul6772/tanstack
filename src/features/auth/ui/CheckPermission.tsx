import type React from 'react';
import * as Hooks from '@/features/auth/hooks/useAuth';
import NoAccess from '@/pages/NoAccess';
import type { PERMISSIONS } from '@/shared/lib/utils/enums';

interface IProps {
  permission: PERMISSIONS;
  page: React.ReactNode;
}

const CheckPermission: React.FC<IProps> = ({ permission, page }) => {
  const { profile } = Hooks.useAuth();

  if (!profile || !profile.permissions?.includes(permission)) {
    return <NoAccess />;
  }

  return <>{page}</>;
};

export default CheckPermission;
