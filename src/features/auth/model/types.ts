import { CABINET_TYPE, PERMISSIONS } from '@/shared/lib/utils/enums';
import { IFile, IIdAndName } from '@/shared/lib/utils/interfaces';

export declare namespace IAction {
    export namespace Login {
        export interface Success {
            token: IEntity.Token;
        }
    }

    export namespace Profile {
        export interface Success {
            profile: IEntity.Profile;
        }
    }
}

export declare namespace IApi {
    export namespace Login {
        export interface Response {
            data: IEntity.Token;
        }
    }

    export namespace Profile {
        export interface Response {
            data: IEntity.Profile;
        }
    }
}

export declare namespace IEntity {
    export interface Profile {
        id: string;
        fullName: string;
        firstName: string;
        lastName: string;
        middleName: string;
        photo: IFile;
        login: string;
        role: IIdAndName;
        permissions: PERMISSIONS[];
        cabinetType: CABINET_TYPE | null;
    }

    export interface Token {
        accessToken: string;
    }
}

export declare namespace IQuery {
    export type Profile = IEntity.Profile;
}

export declare namespace IForm {
    export interface Login {
        username: string;
        password: string;
    }
}

export interface IState {
    isAuthenticated: boolean;
    isFetched: boolean;
    token: string;
    profile: IEntity.Profile;
}
