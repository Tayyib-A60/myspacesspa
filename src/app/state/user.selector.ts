import { UserState } from './user.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
    getUserFeatureState,
    userState => userState.currentUser
);

export const getError = createSelector(
    getUserFeatureState,
    userState => userState.error
);

export const getResponse = createSelector(
    getUserFeatureState,
    userState => userState.response
);