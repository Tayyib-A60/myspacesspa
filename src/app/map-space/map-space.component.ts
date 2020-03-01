import { ActivatedRoute } from '@angular/router';
import { ViewChild,
  EventEmitter, Output, 
   AfterViewInit,
  Input, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as spaceReducer from '../spaces/state/space.reducers';
import * as spaceActions from '../spaces/state/space.actions';
import * as spaceSelectors from '../spaces/state/space.selector';
import { takeWhile } from 'rxjs/operators';
import { SpaceQueryResult } from '../spaces/models/spaceQueryResult';
import { Space } from '../spaces/models/space.model';
import { SpaceService } from '../spaces/space.service';
@Component({
  selector: 'app-map-space',
  templateUrl: './map-space.component.html',
  styleUrls: ['./map-space.component.scss']
})
export class MapSpaceComponent implements OnInit {
  
  componentActive = true;
  spaceQueryResult = <SpaceQueryResult>{items: [], totalItems: 0};
  spaces: Space[] = [];
  type: string;
  searchString: string;
  currentPage: 1;  
  query = {
    currentPage: null,
    pageSize: null,
    spaceType: null,
    searchString: null,
    size: null,
    price: null
  };
  selectedType: string;
  spaceTypes = [];
  priceFilter = [
    {label: '10,000', value: 10000},
    {label: '<20,000', value: 20000},
    {label: '<50,000', value: 50000},
    {label: '<100,000', value: 100000},
    {label: '<500,000', value: 500000},
    {label: '>500000', value: 500001}
  ];
  capacities = [
    {label: 'Up to 50', capacity: 50},
    {label: 'Up to 100', capacity: 100},
    {label: 'Up to 200', capacity: 199},
    {label: 'Up to 500', capacity: 499},
    {label: 'Up to 1000', capacity: 1000},
    {label: 'More than 1000', capacity: 1000}
  ];
  selectedPrice: any;
  selectedCapacity: any;
  latitude: number;
  longitude: number;

  constructor(private store: Store<spaceReducer.SpaceState>,
              private route: ActivatedRoute,
              private spaceService: SpaceService){}
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((myLocation) => {
      this.latitude = myLocation.coords.latitude;
      this.longitude = myLocation.coords.longitude;
    });
    //console.log(this.route.params['value']['spaceType']? 'true': 'false');

    if(this.route.params['value']['spaceType']){
      this.route.params.subscribe(params => {
        this.type = params['query']? params['query'] : '';
        this.query = {currentPage: 1, pageSize: 2, ...this.route.params['value']};
        this.store.dispatch(new spaceActions.GetSpaces(this.query));
      });
    }
    if(!this.route.params['value']['spaceType']) {
      this.query = { currentPage: 1, pageSize: 10, spaceType: null, searchString: null, size: null, price: null };
      this.store.dispatch(new spaceActions.GetSpaces(this.query));
    }

    this.store.pipe(select(spaceSelectors.getSpaceQueryResult),
    takeWhile(() => this.componentActive))
    .subscribe(spaceQR => {
      this.spaceQueryResult = spaceQR
      // if(spaceQR.items)
        //console.log(spaceQR.items[0].photos.filter(p => p.isMain));
      //console.log(spaceQR);      
      });

      this.spaceService.getSpaceTypes().subscribe((spaceTypes: any[]) => {
        // //console.log(spaceTypes);
        this.spaceTypes = spaceTypes;
      })
  }

  onPageChange(page: number) {
    this.query = { ...this.query, currentPage: page, searchString: this.searchString, size: this.selectedCapacity };
    this.store.dispatch(new spaceActions.GetSpaces(this.query));

    this.store.pipe(select(spaceSelectors.getSpaceQueryResult),
    takeWhile(() => this.componentActive))
    .subscribe(spaceQR => {
      this.spaceQueryResult = spaceQR;
      spaceQR.items.forEach(space => {
        // if(space.photos.length > 0 && space.location !== null && (space.pricePD || space.pricePH || space.pricePW)) {
          this.spaces.push(space);
        // }
      });
    });
  }

  search() {
    this.query = { ...this.query, searchString: this.searchString, size: this.selectedCapacity, spaceType: this.selectedType, price: this.selectedPrice };
    this.store.dispatch(new spaceActions.GetSpaces(this.query));

    this.store.pipe(select(spaceSelectors.getSpaceQueryResult),
    takeWhile(() => this.componentActive))
    .subscribe(spaceQR => {
      this.spaceQueryResult = spaceQR;
      spaceQR.items.forEach(space => {
        // if(space.photos.length > 0 && space.location !== null && (space.pricePD || space.pricePH || space.pricePW)) {
          this.spaces.push(space);
        // }
      });
    });
  }

}
