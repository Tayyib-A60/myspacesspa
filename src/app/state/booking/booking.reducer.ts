import { BookingActions } from './booking.actions';
import { BookingActionTypes } from './booking.action.types';

export interface BookingState {
    Bookings: any[],
    customerBookingQR: {},
    merchantBookingQR: {},
    currentBooking: any,
    error: string,
    response: any,
    bookingTimes: any,
    bookingToCreate: any
}

const INITIAL_STATE: BookingState = {
    Bookings: [],
    customerBookingQR: {},
    merchantBookingQR: {},
    currentBooking: null,
    error: '',
    response: null,
    bookingTimes: null,
    bookingToCreate: null
};

export function reducer(state = INITIAL_STATE, action: BookingActions) {
    switch (action.type) {
        case BookingActionTypes.AddBookingToStore:
            return {
                ...state,
                bookingToCreate: action.payload,
                error: null
            };
        case BookingActionTypes.CreateBookingSuccess:
            return {
                ...state,
                response: action.payload,
                error: null
            };
        case BookingActionTypes.CreateBookingFailure:
            return {
                ...state,
                response: null,
                error: action.payload
            }
        case BookingActionTypes.CreateReservationSuccess:
            return {
                ...state,
                response: action.payload,
                error: null
            };
        case BookingActionTypes.CreateReservationFailure:
            return {
                ...state,
                response: null,
                error: action.payload
            };
        case BookingActionTypes.GetCustomerBookingsSuccess:
            return {
                ...state,
                customerBookingQR: action.payload,
                error: ''
            };
        case BookingActionTypes.GetCustomerBookingsFailure:
            return {
                ...state,
                error: action.payload,
                response: null
            };
        case BookingActionTypes.GetMerchantBookingsSuccess:
            return {
                ...state,
                merchantBookingQR: action.payload,
                error: ''
            };
        case BookingActionTypes.GetMerchantBookingsFailure:
            return {
                ...state,
                error: action.payload,
                response: null
            };
        case BookingActionTypes.GetBookingTimesSuccess:
            return {
                ...state,
                bookingTimes: action.payload,
                error: ''
            };
        case BookingActionTypes.GetBookingTimesFailure:
            return {
                ...state,
                bookingTimes: null,
                error: action.payload
            };
        default:
            return { ...state };
    }
}