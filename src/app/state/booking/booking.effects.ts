import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BookingService } from './booking.service';
import * as bookingActions from './booking.actions';
import { BookingActionTypes } from './booking.action.types';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class BookingEffects {
    currentUser: any;
    constructor(private actions$: Actions,
                private bookingService: BookingService,
                private notification: NotificationService,
                private router: Router) {
                    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                }

    // @Effect()
    // successNotification$ = this.actions$.pipe(
    //     ofType(BookingActionTypes.BookingSuccessNotification),
    //     map((action: bookingActions.BookingSuccessNotification) => {
    //         this.notify.typeSuccess(action.payload, 'Success!')
    //     })
    // );

    // @Effect()
    // failureNotification$ = this.actions$.pipe(
    //     ofType(BookingActionTypes.BookingFailureNotification),
    //     map((action: bookingActions.BookingFailureNotification) => {
    //         this.notify.typeSuccess(action.payload, 'Success!')
    //     })
    // );

    @Effect()
    createReservation$: Observable<Action> = this.actions$.pipe(
        ofType(BookingActionTypes.CreateReservation),
        map((action: bookingActions.CreateReservation) => action.payload),
        mergeMap((booking: any) =>
            this.bookingService.createReservation(booking).pipe(
                map(res => {
                    this.notification.typeSuccess('Your reservation was added', 'Success');
                    this.currentUser['roles'] === 'Merchant'? this.router.navigate(['/admin/manage-space']):  this.router.navigate(['profile']);
                    return new bookingActions.CreateReservationSuccess(res);
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Failed');
                    return of(new bookingActions.CreateReservationFailure(err));
                })
            )
        )
    );

    @Effect()
    getCustomerBookings$: Observable<Action> = this.actions$.pipe(
        ofType(BookingActionTypes.GetCustomerBookings),
        map((action: bookingActions.GetCustomerBookings) => action.payload),
        mergeMap((customerId: number) =>
            this.bookingService.getCustomerReservations(customerId).pipe(
                map(res => new bookingActions.GetCustomerBookingsSuccess(res)),
                catchError(err => {
                    this.notification.typeError('Unable to get your bookings/reservations','Failed')
                    return of(new bookingActions.GetCustomerBookingsFailure(err))
                })
            )
        )
    );
    @Effect()
    getBookingTimes$: Observable<Action> = this.actions$.pipe(
        ofType(BookingActionTypes.GetBookingTimes),
        map((action: bookingActions.GetBookingTimes) => action.payload),
        mergeMap((requestBody: any) =>
            this.bookingService.getBookingTimes(requestBody).pipe(
                map(res => {
                    return new bookingActions.GetBookingTimesSuccess(res) 
                }),
                catchError(err => {
                    this.notification.typeError('Please check your internet connection', 'Failed');
                    return of(new bookingActions.GetBookingTimesFailure(err));
                })
            )
        )
    );

    @Effect()
    getMerchantBookings$: Observable<Action> = this.actions$.pipe(
        ofType(BookingActionTypes.GetMerchantBookings),
        map((action: bookingActions.GetMerchantBookings) => action.payload),
        mergeMap((merchantBookingQuery: any) => {            
            return this.bookingService.getMerchantReservations(merchantBookingQuery['userId'], merchantBookingQuery).pipe(
                map(res => new bookingActions.GetMerchantBookingsSuccess(res)
                 ),
                catchError(err => {
                    this.notification.typeError('Please check your internet connection', 'Failed');
                    return of(new bookingActions.GetMerchantBookingsFailure(err));
                })
            )}
        )
    );

    // @Effect()
    // getMerchantBookings$: Observable<Action> = this.actions$.pipe(
    //     ofType(BookingActionTypes.GetCustomerBookings),
    //     map((action: bookingActions.GetCustomerBookings) => action.payload),
    //     mergeMap((customerId: number) =>
    //         this.bookingService.getCustomerReservations(customerId).pipe(
    //             map(res => new bookingActions.GetCustomerBookingsSuccess(res)),
    //             catchError(err => of(new bookingActions.GetCustomerBookingsFailure(err)))
    //         )
    //     )
    // );
}