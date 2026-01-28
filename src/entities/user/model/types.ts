import type { STATUS } from '@/shared/lib/utils/enums';
import type { IFile, IIdAndName, IMeta } from '@/shared/lib/utils/interfaces';

export declare namespace IApi {
  export namespace List {
    export interface Response {
      data: IEntity.User[];
      meta: IMeta;
    }
  }

  export namespace Single {
    export interface Response {
      data: IEntity.User;
    }
  }
}

export declare namespace IEntity {
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    photo: IFile;
    role: IIdAndName;
    status: STATUS;
  }
}

export declare namespace IForm {
  export interface Values {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    photoId?: number | null;
    roleId: number | null;
    status: STATUS;
  }
}
