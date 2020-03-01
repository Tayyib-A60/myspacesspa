import { Action } from '@ngrx/store';
import { BookingActionTypes } from './booking.action.types';
import { Router } from '@angular/router';

export class BookingSuccessNotification implements Action {
    readonly type = BookingActionTypes.BookingSuccessNotification;

    constructor(public payload: string) {
        this.type = BookingActionTypes.BookingSuccessNotification;
    }
}
export class BookingFailureNotification implements Action {
    readonly type = BookingActionTypes.BookingFailureNotification;

    constructor(public payload: string) {
        this.type = BookingActionTypes.BookingFailureNotification;
    }
}
export class AddBookingToStore implements Action {
    readonly type = BookingActionTypes.AddBookingToStore;

    constructor(public payload: any) {
        this.type = BookingActionTypes.AddBookingToStore;
    }
}
export class CreateBooking implements Action {
    readonly type = BookingActionTypes.CreateBooking;

    constructor(public payload: any) {
        this.type = BookingActionTypes.CreateBooking;
    }
}
export class CreateBookingSuccess implements Action {
    readonly type = BookingActionTypes.CreateBookingSuccess;

    constructor(public payload: any) {
        this.type = BookingActionTypes.CreateBookingSuccess;
    }
}
export class CreateBookingFailure implements Action {
    readonly type = BookingActionTypes.CreateBookingFailure;

    constructor(public payload: any) {
        this.type = BookingActionTypes.CreateBookingFailure;
    }
}
export class CreateReservation implements Action {
    readonly type = BookingActionTypes.CreateReservation;

    constructor(public payload: any) {
        this.type = BookingActionTypes.CreateReservation;
    }
}
export class CreateReservationSuccess implements Action {
    readonly type = BookingActionTypes.CreateReservationSuccess;

    constructor(public payload: any) {
        this.type = BookingActionTypes.CreateReservationSuccess;
    }
}
export class CreateReservationFailure implements Action {
    readonly type = BookingActionTypes.CreateReservationFailure;

    constructor(public payload: any) {
        this.type = BookingActionTypes.CreateReservationFailure;
    }
}
export class GetCustomerBookings implements Action {
    readonly type = BookingActionTypes.GetCustomerBookings;

    constructor(public payload: number) {
        this.type = BookingActionTypes.GetCustomerBookings;
    }
}
export class GetCustomerBookingsSuccess implements Action {
    readonly type = BookingActionTypes.GetCustomerBookingsSuccess;

    constructor(public payload: any) {
        this.type = BookingActionTypes.GetCustomerBookingsSuccess;
    }
}
export class GetCustomerBookingsFailure implements Action {
    readonly type = BookingActionTypes.GetCustomerBookingsFailure;

    constructor(public payload: any) {
        this.type = BookingActionTypes.GetCustomerBookingsFailure;
    }
}
export class GetMerchantBookings implements Action {
    readonly type = BookingActionTypes.GetMerchantBookings;

    constructor(public payload: any) {
        this.type = BookingActionTypes.GetMerchantBookings;
    }
}
export class GetMerchantBookingsSuccess implements Action {
    readonly type = BookingActionTypes.GetMerchantBookingsSuccess;

    constructor(public payload: any) {
        this.type = BookingActionTypes.GetMerchantBookingsSuccess;
    }
}
export class GetMerchantBookingsFailure implements Action {
    readonly type = BookingActionTypes.GetMerchantBookingsFailure;

    constructor(public payload: any) {
        this.type = BookingActionTypes.GetMerchantBookingsFailure;
    }
}
export class GetBookingTimes implements Action {
    readonly type = BookingActionTypes.GetBookingTimes;
    
    constructor(public payload: any) {
        this.type = BookingActionTypes.GetBookingTimes;
    }
}
export class GetBookingTimesSuccess implements Action {
    readonly type = BookingActionTypes.GetBookingTimesSuccess;
    
    constructor(public payload: any) {
        this.type = BookingActionTypes.GetBookingTimesSuccess;
    }
}
export class GetBookingTimesFailure implements Action {
    readonly type = BookingActionTypes.GetBookingTimesFailure;
    
    constructor(public payload: any) {
        this.type = BookingActionTypes.GetBookingTimesFailure;
    }
}

export type BookingActions = CreateBooking | CreateBookingSuccess | CreateBookingFailure
| CreateReservation | CreateReservationSuccess | CreateReservationFailure | GetCustomerBookings
| GetCustomerBookingsSuccess | GetCustomerBookingsFailure | GetMerchantBookings
| GetMerchantBookingsSuccess | GetMerchantBookingsFailure | GetBookingTimes
| GetBookingTimesSuccess | GetBookingTimesFailure | BookingSuccessNotification
| BookingFailureNotification | AddBookingToStore;