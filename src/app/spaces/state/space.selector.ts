import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SpaceState } from './space.reducers';

export const getSpaceFeatureState = createFeatureSelector<SpaceState>('spaces');

export const getSpaces = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.spaces
);
export const getMerchantSpaces = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.merchantSpacesQR
);

export const getSpaceTypes = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.spaceTypes
);

export const getSingleSpace = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.spaceToEdit
);

export const getError = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.error
);

export const getSpaceQueryResult = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.spaceQueryResult
);

export const getMerchantsQueryResult = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.merchants
);

export const getMerchantMetrics = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.merchantMetrics
);
export const getPricingOptions = createSelector(
    getSpaceFeatureState,
    spaceState => spaceState.pricingOptions
);