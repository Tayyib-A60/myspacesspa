import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { SpaceState } from '../spaces/state/space.reducers';
import * as spaceActions from './../spaces/state/space.actions';
import * as spaceSelectors from './../spaces/state/space.selector';
import * as bookingSelector from '../state/booking/booking.selector';
import { takeWhile } from 'rxjs/operators';
import { Space } from '../spaces/models/space.model';
import { BookingState } from '../state/booking/booking.reducer';
import { NotificationService } from '../services/notification.service';
import * as bookingActions from '../state/booking/booking.actions';
@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.scss']
})
export class BookingRequestComponent implements OnInit {
  id: any;
  componentActive = true;
  space: Space;
  loaded: boolean;
  booking: any;
  freeAmenities = [];
  amenitiesSelected = [];
  totalCost: number;
  timeFrom: Date;
  timeTo: Date;
  currentUser: any;

  constructor(private route: ActivatedRoute,
              private spaceStore: Store<SpaceState>,
              private bookingStore: Store<BookingState>,
              private notification: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
      this.id = params['id'];
    });
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.booking = JSON.parse(sessionStorage.getItem('bookingToCreate'));
    this.amenitiesSelected = JSON.parse(sessionStorage.getItem('amenitiesSelected'));
    //console.log(this.booking);
    this.timeFrom = new Date(this.booking.usingTimes[0].usingFrom.substr(0, this.booking.usingTimes[0].usingFrom.length-2));
    this.timeTo = new Date(this.booking.usingTimes[this.booking.usingTimes.length-1].usingTill.substr(0, this.booking.usingTimes[0].usingFrom.length-2));
    
    //console.log(this.amenitiesSelected);
    
    
    this.spaceStore.dispatch(new spaceActions.GetSingleSpace(Number(this.id)));

    this.spaceStore.pipe(select(spaceSelectors.getSingleSpace),
        takeWhile(() => this.componentActive))
        .subscribe(space => {
          this.space = space;
          this.loaded = true;

          //console.log(space);
          
          // if(space) {
          //   space.amenities.forEach((amenity) => {
          //     if(amenity.price == 0) {
          //       this.freeAmenities.push(amenity);
          //     }
          //   });
          // } 
    });

    // this.bookingStore.pipe(select(bookingSelector.getBookingToCreate),
    //     takeWhile(() => this.componentActive))
    //     .subscribe(booking => {
    //       this.booking = booking;
    //       this.loaded = true; 
    // });
  }

  amenityChecked(event) {    
    if(event.target.checked) {
      const amenityIndex = this.space.amenities.findIndex(a => a['id'] === Number(event.target.value));
      this.totalCost += this.space.amenities[amenityIndex].price;
      this.amenitiesSelected.push(this.space.amenities[amenityIndex]);
    }
    if(!event.target.checked) {
      const index = this.amenitiesSelected.findIndex(a => a['id'] === Number(event.target.value));
      this.totalCost -= this.amenitiesSelected[index].price;
      this.amenitiesSelected.splice(index, 1);
    }
  }

  bookSpace(){
    if(this.currentUser === null) {
      this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    }
  }
  reserveSpace(){
    if(this.currentUser === null) {
      this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    }
    this.spaceStore.dispatch(new bookingActions.CreateReservation(this.booking));
  }

}
