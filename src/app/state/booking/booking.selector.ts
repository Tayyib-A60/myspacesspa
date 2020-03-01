import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingState } from './booking.reducer';

export const getBookingFeatureState = createFeatureSelector<BookingState>('booking');

export const getBookingToCreate = createSelector(
    getBookingFeatureState,
    bookingState => bookingState.bookingToCreate
);

export const getCurrentBooking = createSelector(
    getBookingFeatureState,
    bookingState => bookingState.currentBooking
);

export const getCustomerBookings = createSelector(
    getBookingFeatureState,
    bookingState => bookingState.customerBookingQR
);

export const getMerchantBookings = createSelector(
    getBookingFeatureState,
    bookingState => bookingState.merchantBookingQR
);

export const getBookingTimes = createSelector(
    getBookingFeatureState,
    bookingState => bookingState.bookingTimes
);