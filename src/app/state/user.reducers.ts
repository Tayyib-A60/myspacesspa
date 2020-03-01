import { UserActions } from './user.actions';
import { UserActionTypes } from './user.action.types';

export interface UserState {
    currentUser: any,
    error: string,
    response: any
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    error: '',
    response: null
};

export function reducer(state = INITIAL_STATE, action: UserActions) {
    switch(action.type) {
        case UserActionTypes.CreateUserSuccess:
            return {
                ...state,
                response: action.payload,
                error: null
            };
        case UserActionTypes.CreateUserFailure:
            return {
                ...state,
                error: action.payload,
                response: null
            };
        case UserActionTypes.SignInUserSuccess:
            sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
            return {
                ...state,
                currentUser: action.payload,
                error: ''
            };
        case UserActionTypes.SignOutUser:
            sessionStorage.removeItem('currentUser');
            return {
                ...state,
                currentUser: null,
                error: ''
            };
        case UserActionTypes.SignInUserFailure:
            return {
                ...state,
                error: action.payload,
                response: null
            };
        case UserActionTypes.ResetPasswordSuccess:
            return {
                ...state,
                error: null,
                response: action.payload
            };
        case UserActionTypes.ResetPasswordFailure:
            return {
                ...state,
                error: action.payload,
                response: null
            };
        case UserActionTypes.ForgotPasswordSuccess:
            return {
                ...state,
                error: null,
                response: action.payload
            };
        case UserActionTypes.ForgotPasswordFailure:
            return {
                ...state,
                error: action.payload,
                response: null
            };
        case UserActionTypes.ConfirmAsMerchantSuccess:
            return {
                ...state,
                response: action.payload,
                error: null
            };
        case UserActionTypes.ConfirmAsMerchantFailure:
            return {
                ...state,
                response: null,
                error: action.payload
            };
        case UserActionTypes.ConfirmEmailSuccess:
            return {
                ...state,
                response: action.payload,
                error: null
            };
        case UserActionTypes.ConfirmEmailFailure:
            return {
                ...state,
                response: null,
                error: action.payload
            };
        default: return state;
    }
}