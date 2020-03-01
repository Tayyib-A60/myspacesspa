import { Action } from '@ngrx/store';
import { UserActionTypes } from './user.action.types';
import { User } from '../spaces/models/user.model';


export class CreateUser implements Action {
    readonly type = UserActionTypes.CreateUser;

    constructor(public payload: User) {
        this.type = UserActionTypes.CreateUser;
    }
}

export class CreateUserSuccess implements Action {
    readonly type = UserActionTypes.CreateUserSuccess;

    constructor(public payload: any) {
        this.type = UserActionTypes.CreateUserSuccess;
    }
}

export class CreateUserFailure implements Action {
    readonly type = UserActionTypes.CreateUserFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.CreateUserFailure;
    }
}

export class CreateMerchantUser implements Action {
    readonly type = UserActionTypes.CreateMerchantUser;

    constructor(public payload: User) {
        this.type = UserActionTypes.CreateMerchantUser;
    }
}

export class CreateMerchantUserSuccess implements Action {
    readonly type = UserActionTypes.CreateMerchantUserSuccess;

    constructor(public payload: any) {
        this.type = UserActionTypes.CreateMerchantUserSuccess;
    }
}

export class CreateMerchantUserFailure implements Action {
    readonly type = UserActionTypes.CreateMerchantUserFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.CreateMerchantUserFailure;
    }
}

export class SignInUser implements Action {
    readonly type = UserActionTypes.SignInUser;

    constructor(public payload: User) {
        this.type = UserActionTypes.SignInUser;
    }
}
export class SignOutUser implements Action {
    readonly type = UserActionTypes.SignOutUser;

    constructor() {
        this.type = UserActionTypes.SignOutUser;
    }
}

export class SignInUserSuccess implements Action {
    readonly type = UserActionTypes.SignInUserSuccess;

    constructor(public payload: any) {
        this.type = UserActionTypes.SignInUserSuccess;
    }
}

export class SignInUserFailure implements Action {
    readonly type = UserActionTypes.SignInUserFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.SignInUserFailure;
    }
}

export class ForgotPassword implements Action {
    readonly type = UserActionTypes.ForgotPassword;

    constructor(public payload: any) {
        this.type = UserActionTypes.ForgotPassword;
    }
}

export class ForgotPasswordSuccess implements Action {
    readonly type = UserActionTypes.ForgotPasswordSuccess;

    constructor(public payload: any) {
        this.type = UserActionTypes.ForgotPasswordSuccess;
    }
}

export class ForgotPasswordFailure implements Action {
    readonly type = UserActionTypes.ForgotPasswordFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.ForgotPasswordFailure;
    }
}

export class ResetPassword implements Action {
    readonly type = UserActionTypes.ResetPassword;

    constructor(public payload: any) {
        this.type = UserActionTypes.ResetPassword;
    }
}

export class ResetPasswordSuccess implements Action {
    readonly type = UserActionTypes.ResetPasswordSuccess;

    constructor(public payload: any) {
        this.type = UserActionTypes.ResetPasswordSuccess;
    }
}

export class ResetPasswordFailure implements Action {
    readonly type = UserActionTypes.ResetPasswordFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.ResetPasswordFailure;
    }
}
export class ConfirmEmail implements Action {
    readonly type = UserActionTypes.ConfirmEmail;

    constructor(public payload: any) {
        this.type = UserActionTypes.ConfirmEmail;
    }
}
export class ConfirmEmailSuccess implements Action {
    readonly type = UserActionTypes.ConfirmEmailSuccess;

    constructor(public payload: string) {
        this.type = UserActionTypes.ConfirmEmailSuccess;
    }
}
export class ConfirmEmailFailure implements Action {
    readonly type = UserActionTypes.ConfirmEmailFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.ConfirmEmailFailure;
    }
}
export class ConfirmAsMerchant implements Action {
    readonly type = UserActionTypes.ConfirmAsMerchant;

    constructor(public payload: any) {
        this.type = UserActionTypes.ConfirmAsMerchant;
    }
}
export class ConfirmAsMerchantSuccess implements Action {
    readonly type = UserActionTypes.ConfirmAsMerchantSuccess;

    constructor(public payload: string) {
        this.type = UserActionTypes.ConfirmAsMerchantSuccess;
    }
}
export class ConfirmAsMerchantFailure implements Action {
    readonly type = UserActionTypes.ConfirmAsMerchantFailure;

    constructor(public payload: string) {
        this.type = UserActionTypes.ConfirmAsMerchantFailure;
    }
}


export type UserActions = CreateUser | CreateUserSuccess | CreateUserFailure
| CreateMerchantUser | SignInUser | SignInUserSuccess | SignInUserFailure | SignOutUser
| ResetPassword | ResetPasswordSuccess | ResetPasswordFailure | ForgotPassword
| ForgotPasswordSuccess | ForgotPasswordFailure | ConfirmEmail
| ConfirmEmailSuccess | ConfirmEmailFailure | ConfirmAsMerchant
| ConfirmAsMerchantSuccess | ConfirmAsMerchantFailure;