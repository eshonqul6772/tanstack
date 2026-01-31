import type { STATUS } from '@/shared/lib/utils/enums';
import type { IIdAndName, IMeta, IMinFile } from '@/shared/lib/utils/interfaces';

export declare namespace IApi {
  export namespace List {
    export interface Response {
      data: IEntity.Data[];
    }
  }

  export namespace Single {
    export interface Response {
      data: IEntity.Data;
    }
  }
}

export declare namespace IEntity {
  export interface Data extends Omit<IForm.Values, 'photoId' | 'roleId'> {
    id: number | null;
    photo: IMinFile;
    role: IIdAndName;
    photoId?: string | null;
    roleId?: string | null;
    createdAt: string;
    updatedAt: string;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Data[];
    meta: IMeta;
  }

  export interface Single {
    item: IEntity.Data;
  }

  export interface Delete {
    id: number | null;
  }
}

export declare namespace IForm {
  export interface Values {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    password: string;
    photoId: string | null;
    roleId: string | null;
    status: STATUS;
  }
}
