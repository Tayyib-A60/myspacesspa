import { Action } from '@ngrx/store';
import { SpaceActionTypes } from './space.action.types';
import { Space } from '../models/space.model';
import { SpaceType } from '../models/spaceType.model';
import { Amenity } from '../models/amenity.model';
import { SpaceQueryResult } from '../models/spaceQueryResult';

export class SuccessNotification implements Action {
    readonly type = SpaceActionTypes.SuccessNotification;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.SuccessNotification;
    }
}
export class FailureNotification implements Action {
    readonly type = SpaceActionTypes.FailureNotification;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.FailureNotification;
    }
}
export class NotificationDisplayed implements Action {
    readonly type = SpaceActionTypes.NotificationDisplayed;

    constructor() {
        this.type = SpaceActionTypes.NotificationDisplayed;
    }
}
export class CreateSpace implements Action {
    readonly type = SpaceActionTypes.CreateSpace;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.CreateSpace;
    }
}
export class CreateSpaceSuccess implements Action {
    readonly type = SpaceActionTypes.CreateSpaceSuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.CreateSpaceSuccess;
    }
}
export class CreateSpaceFailure implements Action {
    readonly type = SpaceActionTypes.CreateSpaceFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.CreateSpaceFailure;
    }
}

export class UpdateSpace implements Action {
    readonly type = SpaceActionTypes.UpdateSpace;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.UpdateSpace;
    }
}

export class UpdateSpaceSuccess implements Action {
    readonly type = SpaceActionTypes.UpdateSpaceSuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.UpdateSpaceSuccess;
    }
}
export class UpdateSpaceFailure implements Action {
    readonly type = SpaceActionTypes.UpdateSpaceFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.UpdateSpaceFailure;
    }
}

export class DeleteSpace implements Action {
    readonly type = SpaceActionTypes.DeleteSpace;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.DeleteSpace;
    }
}

export class DeleteSpaceSuccess implements Action {
    readonly type = SpaceActionTypes.DeleteSpaceSuccess;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.DeleteSpaceSuccess;
    }
}

export class DeleteSpaceFailure implements Action {
    readonly type = SpaceActionTypes.DeleteSpaceFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.DeleteSpaceFailure;
    }
}
export class GetSpaces implements Action {
    readonly type = SpaceActionTypes.GetSpaces;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.GetSpaces;
    }
}
export class GetSpacesSuccess implements Action {
    readonly type = SpaceActionTypes.GetSpacesSuccess;

    constructor(public payload: SpaceQueryResult) {
        this.type = SpaceActionTypes.GetSpacesSuccess;
    }
}
export class GetSpacesFailure implements Action {
    readonly type = SpaceActionTypes.GetSpacesFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.GetSpacesFailure;
    }
}
export class GetMerchantSpaces implements Action {
    readonly type = SpaceActionTypes.GetMerchantSpaces;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.GetMerchantSpaces;
    }
}
export class GetMerchantSpacesSuccess implements Action {
    readonly type = SpaceActionTypes.GetMerchantSpacesSuccess;

    constructor(public payload: SpaceQueryResult) {
        this.type = SpaceActionTypes.GetMerchantSpacesSuccess;
    }
}
export class GetMerchantSpacesFailure implements Action {
    readonly type = SpaceActionTypes.GetMerchantSpacesFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.GetMerchantSpacesFailure;
    }
}

export class GetSingleSpace implements Action {
    readonly type = SpaceActionTypes.GetSingleSpace;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.GetSingleSpace;
    }
}
export class GetSingleSpaceSuccess implements Action {
    readonly type = SpaceActionTypes.GetSingleSpaceSuccess;

    constructor(public payload: Space) {
        this.type = SpaceActionTypes.GetSingleSpaceSuccess;
    }
}
export class GetSingleSpaceFailure implements Action {
    readonly type = SpaceActionTypes.GetSingleSpaceFailure;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.GetSingleSpaceFailure;
    }
}

export class CreateSpaceType implements Action {
    readonly type = SpaceActionTypes.CreateSpaceType;

    constructor(public payload: SpaceType) {
        this.type = SpaceActionTypes.CreateSpaceType;
    }
}
export class CreateSpaceTypeSuccess implements Action {
    readonly type = SpaceActionTypes.CreateSpaceTypeSuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.CreateSpaceTypeSuccess;
    }
}
export class CreateSpaceTypeFailure implements Action {
    readonly type = SpaceActionTypes.CreateSpaceTypeFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.CreateSpaceTypeFailure;
    }
}

export class UpdateSpaceType implements Action {
    readonly type = SpaceActionTypes.UpdateSpaceType;

    constructor(public payload: SpaceType) {
        this.type = SpaceActionTypes.UpdateSpaceType;
    }
}
export class UpdateSpaceTypeSuccess implements Action {
    readonly type = SpaceActionTypes.UpdateSpaceTypeSuccess;

    constructor(public payload: SpaceType) {
        this.type = SpaceActionTypes.UpdateSpaceTypeSuccess;
    }
}
export class UpdateSpaceTypeFailure implements Action {
    readonly type = SpaceActionTypes.UpdateSpaceTypeFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.UpdateSpaceTypeFailure;
    }
}

export class DeleteSpaceType implements Action {
    readonly type = SpaceActionTypes.DeleteSpaceType;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.DeleteSpaceType;
    }
}
export class DeleteSpaceTypeSuccess implements Action {
    readonly type = SpaceActionTypes.DeleteSpaceTypeSuccess;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.DeleteSpaceTypeSuccess;
    }
}
export class DeleteSpaceTypeFailure implements Action {
    readonly type = SpaceActionTypes.DeleteSpaceTypeFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.DeleteSpaceTypeFailure;
    }
}
export class GetSpaceTypes implements Action {
    readonly type = SpaceActionTypes.GetSpaceTypes;

    constructor() {
        this.type = SpaceActionTypes.GetSpaceTypes;
    }
}
export class GetSpaceTypesSuccess implements Action {
    readonly type = SpaceActionTypes.GetSpaceTypesSuccess;

    constructor(public payload: SpaceType[]) {
        this.type = SpaceActionTypes.GetSpaceTypesSuccess;
    }
}
export class GetSpaceTypesFailure implements Action {
    readonly type = SpaceActionTypes.GetSpaceTypesFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.GetSpaceTypesFailure;
    }
}
export class CreateAmenity implements Action {
    readonly type = SpaceActionTypes.CreateAmenity;

    constructor(public payload: Amenity) {
        this.type = SpaceActionTypes.CreateAmenity;
    }
}
export class CreateAmenitySuccess implements Action {
    readonly type = SpaceActionTypes.CreateAmenitySuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.CreateAmenitySuccess;
    }
}
export class CreateAmenityFailure implements Action {
    readonly type = SpaceActionTypes.CreateAmenityFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.CreateAmenityFailure;
    }
}

export class GetMerchants implements Action {
    readonly type = SpaceActionTypes.GetMerchants;

    constructor() {
        this.type = SpaceActionTypes.GetMerchants;
    }
}
export class GetMerchantsSuccess implements Action {
    readonly type = SpaceActionTypes.GetMerchantsSuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.GetMerchantsSuccess;
    }
}
export class GetMerchantsFailure implements Action {
    readonly type = SpaceActionTypes.GetMerchantsFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.GetMerchantsFailure;
    }
}
export class DeleteSpacePhoto implements Action {
    readonly type = SpaceActionTypes.DeleteSpacePhoto;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.DeleteSpacePhoto;
    }
}
export class DeleteSpacePhotoSuccess implements Action {
    readonly type = SpaceActionTypes.DeleteSpacePhotoSuccess;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.DeleteSpacePhotoSuccess;
    }
}
export class DeleteSpacePhotoFailure implements Action {
    readonly type = SpaceActionTypes.DeleteSpacePhotoFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.DeleteSpacePhotoFailure;
    }
}
export class SetMainPhoto implements Action {
    readonly type = SpaceActionTypes.SetMainPhoto;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.SetMainPhoto;
    }
}
export class SetMainPhotoSuccess implements Action {
    readonly type = SpaceActionTypes.SetMainPhotoSuccess;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.SetMainPhotoSuccess;
    }
}
export class SetMainPhotoFailure implements Action {
    readonly type = SpaceActionTypes.SetMainPhotoFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.SetMainPhotoFailure;
    }
}
export class GetMerchantMetrics implements Action {
    readonly type = SpaceActionTypes.GetMerchantMetrics;

    constructor(public payload: number) {
        this.type = SpaceActionTypes.GetMerchantMetrics;
    }
}
export class GetMerchantMetricsSuccess implements Action {
    readonly type = SpaceActionTypes.GetMerchantMetricsSuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.GetMerchantMetricsSuccess;
    }
}
export class GetMerchantMetricsFailure implements Action {
    readonly type = SpaceActionTypes.GetMerchantMetricsFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.GetMerchantMetricsFailure;
    }
}
export class CreatePricingOption implements Action {
    readonly type = SpaceActionTypes.CreatePricingOption;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.CreatePricingOption;
    }
}
export class CreatePricingOptionSuccess implements Action {
    readonly type = SpaceActionTypes.CreatePricingOptionSuccess;

    constructor() {
        this.type = SpaceActionTypes.CreatePricingOptionSuccess;
    }
}
export class CreatePricingOptionFailure implements Action {
    readonly type = SpaceActionTypes.CreatePricingOptionFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.CreatePricingOptionFailure;
    }
}
export class GetPricingOptions implements Action {
    readonly type = SpaceActionTypes.GetPricingOptions;

    constructor() {
        this.type = SpaceActionTypes.GetPricingOptions;
    }
}
export class GetPricingOptionsSuccess implements Action {
    readonly type = SpaceActionTypes.GetPricingOptionsSuccess;

    constructor(public payload: any) {
        this.type = SpaceActionTypes.GetPricingOptionsSuccess;
    }
}

export class GetPricingOptionsFailure implements Action {
    readonly type = SpaceActionTypes.GetPricingOptionsFailure;

    constructor(public payload: string) {
        this.type = SpaceActionTypes.GetPricingOptionsFailure;
    }
}


export type SpaceActions = CreateSpace | UpdateSpace 
| DeleteSpace | CreateSpaceType | UpdateSpaceType | DeleteSpaceType
| CreateSpaceSuccess | CreateSpaceFailure | UpdateSpaceSuccess | UpdateSpaceFailure
| DeleteSpaceSuccess | DeleteSpaceFailure | CreateSpaceTypeSuccess | CreateSpaceTypeFailure
| UpdateSpaceTypeSuccess | UpdateSpaceTypeFailure | DeleteSpaceTypeSuccess | DeleteSpaceTypeFailure
| CreateAmenity | CreateAmenitySuccess | CreateAmenityFailure | GetSpaces | GetSpacesSuccess 
| GetSpacesFailure | GetMerchantSpaces | GetMerchantSpacesSuccess | GetMerchantSpacesFailure 
| GetSpaceTypes | GetSpaceTypesSuccess | GetSpaceTypesFailure | GetSingleSpace | GetSingleSpaceSuccess 
| GetSingleSpaceFailure | SuccessNotification | FailureNotification | NotificationDisplayed 
| GetMerchants | GetMerchantsSuccess | GetMerchantsFailure| DeleteSpacePhoto | DeleteSpacePhotoSuccess 
| DeleteSpacePhotoFailure | SetMainPhoto | SetMainPhotoSuccess | SetMainPhotoFailure
| GetMerchantMetrics | GetMerchantMetricsSuccess | GetMerchantMetricsFailure | CreatePricingOption
| CreatePricingOptionSuccess | CreatePricingOptionFailure | GetPricingOptions | GetPricingOptionsSuccess
| GetPricingOptionsFailure; 