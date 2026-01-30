import type { PERMISSIONS, STATUS } from '@/shared/lib/utils/enums';
import type { IIdAndName, IMeta } from '@/shared/lib/utils/interfaces';

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

  export namespace Select {
    export type Response = IIdAndName[];
  }

  export namespace Permission {
    export type Response = IEntity.Permission[];
  }
}

export declare namespace IEntity {
  export interface Data extends IForm.Values {
    id: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface Permission {
    name: PERMISSIONS;
    key: string;
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

  export interface Permission {
    items: IEntity.Permission[];
  }
}

export declare namespace IForm {
  export interface Values {
    name: string;
    description: string;
    permissions: PERMISSIONS[];
    status: STATUS;
  }
}
