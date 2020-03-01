import { ManageMerchantsService } from './../manage-merchants.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SpaceService } from '../space.service';
import { SpaceActionTypes } from './space.action.types';
import * as spaceActions from './space.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { SpaceType } from '../models/spaceType.model';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Amenity } from '../models/amenity.model';
import { Space } from '../models/space.model';
import { SpaceQueryResult } from '../models/spaceQueryResult';
import { NotificationService } from '../../services/notification.service';
import { QueryResult } from '../models/queryResult.model';
import { CreatePricingOptionFailure, GetPricingOptionsFailure } from './space.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class SpaceEffects {
    // merchantId = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser'))['id'] : 0;
    query = {
        currentPage: 1,
        pageSize: 10
    };
    // merchantQuery = {
    //     userId: this.merchantId,
    //     currentPage: 1,
    //     pageSize: 10
    // };
    constructor(private actions$: Actions,
                private spaceService: SpaceService,
                private notification: NotificationService,
                private merchantService: ManageMerchantsService,
                private router: Router,
                private route: ActivatedRoute) {}

    // @Effect()
    // successNotification$ = this.actions$.pipe(
    //     ofType(SpaceActionTypes.GetSpaceTypesSuccess),
    //     map((action: spaceActions.SuccessNotification) => {
    //         this.notify.typeSuccess(action.payload, 'Success!');
    //     })
    // );
    
    // @Effect()
    // failureNotification$ = this.actions$.pipe(
    //     ofType(SpaceActionTypes.FailureNotification),
    //     map((action: spaceActions.FailureNotification) => {
    //         this.notify.typeError(action.payload, 'Error!')
    //     })
    // );
    
    @Effect()
    createSpaceType$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.CreateSpaceType),
        map((action: spaceActions.CreateSpaceType) => action.payload),
        mergeMap((spaceType: SpaceType) => 
            this.spaceService.createSpaceType(spaceType).pipe(
                map(response => {
                    this.notification.typeSuccess('Space type was added successfully', 'Space Type Success');
                    this.router.navigate(['/admin/add-space'], {relativeTo: this.route});
                    return new spaceActions.CreateSpaceTypeSuccess(response);
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.CreateSpaceTypeFailure(err))
                })
            )
        )
    );
    
    @Effect()
    createSpace$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.CreateSpace),
        map((action: spaceActions.CreateSpace) => action.payload),
        mergeMap((space: Space) => 
            this.spaceService.createSpace(space).pipe(
                map(response => {
                    this.notification.typeSuccess('Space added', 'Success')
                    return new spaceActions.CreateSpaceSuccess(response)
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.CreateSpaceFailure(err));
                })
            )
        )
    );

    @Effect()
    updateSpace$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.UpdateSpace),
        map((action: spaceActions.UpdateSpace) => action.payload),
        mergeMap((space: Space) => 
            this.spaceService.updateSpace(space.id, space).pipe(
                map(response => {
                    this.notification.typeSuccess('Space updated', 'Success');
                    this.router.navigate(['/admin/manage-space'], {relativeTo: this.route});
                    return new spaceActions.UpdateSpaceSuccess(response);
                }),
                catchError(err =>{
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.UpdateSpaceFailure(err));
                })
            )
        )
    );

    @Effect()
    createAmenity$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.CreateAmenity),
        map((action: spaceActions.CreateAmenity) => action.payload),
        mergeMap((amenity: Amenity) => 
            this.spaceService.createAmenity(amenity).pipe(
                map(response => {
                    this.notification.typeSuccess('Amenity added','Success')
                    return new spaceActions.CreateAmenitySuccess(response)
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.CreateAmenityFailure(err))
                })
            )
        )
    );

    @Effect()
    createPricingOption$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.CreatePricingOption),
        map((action: spaceActions.CreatePricingOption) => action.payload),
        mergeMap((pricingOption: any) => 
            this.spaceService.createPricingOption(pricingOption).pipe(
                map(() => {
                    this.notification.typeSuccess('Pricing option added','Success')
                    return new spaceActions.CreatePricingOptionSuccess();
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.CreatePricingOptionFailure(err))
                })
            )
        )
    );

    @Effect()
    getSingleSpace$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetSingleSpace),
        mergeMap((action: spaceActions.GetSingleSpace) => this.spaceService.getSpace(action.payload)
            .pipe(
                map((space: Space) => new spaceActions.GetSingleSpaceSuccess(space)),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetSingleSpaceFailure(err))
                })
            ) 
        )
    );

    @Effect()
    getSpaceTypes$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetSpaceTypes),
        mergeMap((action: spaceActions.GetSpaceTypes) => this.spaceService.getSpaceTypes()
            .pipe(
                map((spaceTypes: SpaceType[]) => new spaceActions.GetSpaceTypesSuccess(spaceTypes)),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetSpaceTypesFailure(err))
                })
            ) 
        )
    );

    @Effect()
    getPricingOptions$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetPricingOptions),
        mergeMap((action: spaceActions.GetPricingOptions) => this.spaceService.getpricingOptions()
            .pipe(
                map((pricingOptions: any[]) => new spaceActions.GetPricingOptionsSuccess(pricingOptions)),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetPricingOptionsFailure(err))
                })
            ) 
        )
    );

    @Effect()
    getSpaces$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetSpaces),
        mergeMap((action: spaceActions.GetSpaces) => this.spaceService.getSpaces(action.payload)
            .pipe(
                map((spaceQueryResult: SpaceQueryResult) => {
                    this.router.navigate(['/map-space']);
                    return new spaceActions.GetSpacesSuccess(spaceQueryResult)
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetSpacesFailure(err))
                })
            )
        )
    );
    
    @Effect()
    getMerchantSpaces$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetMerchantSpaces),
        mergeMap((action: spaceActions.GetMerchantSpaces) => this.spaceService.getMerchantSpaces(action.payload)
            .pipe(
                map((merchantSpaceQR: SpaceQueryResult) => new spaceActions.GetMerchantSpacesSuccess(merchantSpaceQR)),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetMerchantSpacesFailure(err))
                })
            )
        )
    );

    @Effect()
    getMerchants$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetMerchants),
        mergeMap((action: spaceActions.GetMerchants) => this.spaceService.getMerchants()
            .pipe(
                map((merchants: QueryResult) => new spaceActions.GetMerchantsSuccess(merchants)),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetMerchantsFailure(err))
                })
            )
        )
    );

    @Effect()
    deleteSpace$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.DeleteSpace),
        map((action: spaceActions.DeleteSpace) => action.payload),
        mergeMap((id: number) => 
            this.spaceService.deleteSpace(id).pipe(
                map((response: number) => {
                    this.notification.typeSuccess('Space deleted', 'Success');
                    return new spaceActions.DeleteSpaceSuccess(response)
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.DeleteSpaceFailure(err))
                })
            )
        )
    );

    @Effect()
    deletePhoto$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.DeleteSpacePhoto),
        map((action: spaceActions.DeleteSpace) => action.payload),
        mergeMap((id: number) =>
            this.spaceService.deletePhoto(id).pipe(
                map((res) => {
                    this.notification.typeSuccess('Photo deleted', 'Success');
                    return new spaceActions.DeleteSpacePhotoSuccess(id)
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.DeleteSpacePhotoFailure(err))
                })
            )
        )
    );   
    
    @Effect()
    setMainPhoto$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.SetMainPhoto),
        map((action: spaceActions.SetMainPhoto) => action.payload),
        mergeMap((ids) => 
            this.spaceService.setMainPhoto(ids).pipe(
                map((res) => {
                    this.notification.typeSuccess('Main photo is set', 'Success');
                    return new spaceActions.SetMainPhotoSuccess(ids['newMainId'])
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.SetMainPhotoFailure(err))
                })
            )
        )
    );

    @Effect()
    getMerchantMetrics$: Observable<Action> = this.actions$.pipe(
        ofType(SpaceActionTypes.GetMerchantMetrics),
        map((action: spaceActions.GetMerchantMetrics) => action.payload),
        mergeMap((merchantId) => 
            this.spaceService.getMerchantMetrics(merchantId).pipe(
                map((res) => {                
                    this.notification.typeSuccess('Analytics generated', 'Success');
                    return new spaceActions.GetMerchantMetricsSuccess(res)
                }),
                catchError(err => {
                    this.notification.typeError(`${err.message}`, 'Error');
                    return of(new spaceActions.GetMerchantMetricsFailure(err))
                })
            )
        )
    );
}