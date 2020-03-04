import { Router } from '@angular/router';
import { NotificationService } from './../services/notification.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserService } from './user.service';
import { UserActionTypes } from './user.action.types';
import * as userActions from '../state/user.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { User } from '../spaces/models/user.model';

@Injectable()
export class UserEffects {

    constructor(private action$: Actions,
                private userService: UserService,
                private notification: NotificationService,
                private router: Router) { }
    
    @Effect()
    createUser$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.CreateUser),
        map((action: userActions.CreateUser) => action.payload),
        mergeMap((user: User) => 
            this.userService.createUserAsCustomer(user).pipe(
                map(response => {
                    this.notification.typeSuccess('Sign up was successful', 'Sign up success');
                    return new userActions.CreateUserSuccess(response);
                }),
                catchError(err => {
                    this.notification.typeError('Sign up failed', `${err.message}`);
                    return of(new userActions.CreateUserFailure(err));
                })
            )
        )
    );

    @Effect()
    createMerchantUser$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.CreateMerchantUser),
        map((action: userActions.CreateMerchantUser) => action.payload),
        mergeMap((user: User) => 
            this.userService.createUserAsMerchant(user).pipe(
                map(response => {
                    this.notification.typeSuccess('Sign up was successful', 'Sign up success');
                    this.router.navigate['sign-in'];
                    return new userActions.CreateUserSuccess(response);
                }),
                catchError(err => {
                    this.notification.typeError('Sign up failed', 'Sign up failed');
                    return of(new userActions.CreateUserFailure(err));
                })
            )
        )
    );

    @Effect()
    signInUser$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.SignInUser),
        map((action: userActions.SignInUser) => action.payload),
        mergeMap((user: User) => 
            this.userService.signInUser(user).pipe(
                map(user => {
                    this.notification.typeSuccess('Sign in was successful', 'Sign in success');
                    this.router.navigate(['space-home']);
                    return new userActions.SignInUserSuccess(user);
                }),
                catchError(err => {
                    this.notification.typeError('Sign in failed' , 'Sign in failed');
                    return of(new userActions.SignInUserFailure(err));
                })
            )
        )
    );

    @Effect()
    forgotPassword$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.ForgotPassword),
        map((action: userActions.ForgotPassword) => action.payload),
        mergeMap((user: any) => 
            this.userService.forgotPassword(user).pipe(
                map(res => {
                    this.notification.typeSuccess('An link to reset your password has been sent to your email', 'Success');
                    return new userActions.ForgotPasswordSuccess(res);
                }),
                catchError(err => {
                    this.notification.typeError('Unable to send email, please try again', 'Failed')
                   return of(new userActions.ForgotPasswordFailure(err));
                })
            )
        )
    );

    @Effect()
    resetPassword$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.ResetPassword),
        map((action: userActions.ResetPassword) => action.payload),
        mergeMap((userToUpdate: any) => 
            this.userService.resetPassword(userToUpdate).pipe(
                map(res => {
                    this.notification.typeSuccess('Password reset was successful', 'Success')
                    return new userActions.ResetPasswordSuccess(res);
                }),
                catchError(err => {
                    this.notification.typeSuccess('Unable to reset your password', 'Failed')
                    return of(new userActions.ResetPasswordFailure(err))
                })
            )
        )
    );

    @Effect()
    confirmEmail$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.ConfirmEmail),
        map((action: userActions.ConfirmEmail) => action.payload),
        mergeMap((userToConfirm: any) =>
            this.userService.confirmEmail(userToConfirm).pipe(
                map(res => {
                    this.notification.typeSuccess('Your email has been confirmed', 'Success');
                    return new userActions.ConfirmEmailSuccess(res.toString());
                }),
                catchError(err => {
                    // if(err.error !== null || undefined)
                    //     this.notification.typeError(`${err.error}`, 'Failed');
                    return of(new userActions.ConfirmEmailFailure(err));
                })
            )
        )
    );
    @Effect()
    confirmAsMerchant$: Observable<Action> = this.action$.pipe(
        ofType(UserActionTypes.ConfirmAsMerchant),
        map((action: userActions.ConfirmAsMerchant) => action.payload),
        mergeMap((merchantToConfirm: any) =>
            this.userService.confirmAsMerchant(merchantToConfirm).pipe(
                map(res => {
                    this.notification.typeSuccess('Merchant has been confirmed', 'Success');
                    return new userActions.ConfirmAsMerchantSuccess(res.toString())
                }),
                catchError(err => {
                    this.notification.typeError('Unable to confirm merchant, please check your internet connection', 'Failed');
                return of(new userActions.ConfirmAsMerchantFailure(err));
                })
            )
        )
    );



}