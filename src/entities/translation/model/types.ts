import type { CABINET_TYPE, STATUS } from '@/shared/lib/utils/enums';
import type { IMeta, IMultiName } from '@/shared/lib/utils/interfaces';

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
  export interface Data extends IForm.Values {
    id: number;
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
    name: IMultiName;
    tag: string;
    types: CABINET_TYPE[];
    status: STATUS;
  }
}
