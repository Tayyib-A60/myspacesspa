import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as spaceActions from '../spaces/state/space.actions';
import * as spaceSelectors from '../spaces/state/space.selector';
import * as userSelectors from '../state/user.selector';
import * as bookingActions from '../state/booking/booking.actions';
import * as bookingSelectors from '../state/booking/booking.selector';
import { SpaceState } from '../spaces/state/space.reducers';
import { UserState } from '../state/user.reducers';
import { BookingState } from '../state/booking/booking.reducer';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentOrientation = 'horizontal'
  currentUser: any;
  componentActive = true;
  reservations = [];
  upcomingReservations = [];
  previousReservations = [];
  currentRate: any;
  firstRating: any;
  firstRate: any;

  constructor(private route: ActivatedRoute,
              private spaceStore: Store<SpaceState>,
              private userStore: Store<UserState>,
              private bookingStore: Store<BookingState>) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getCustomerBooking();
  }

  private getCustomerBooking() {
    this.bookingStore.dispatch(new bookingActions.GetCustomerBookings(this.currentUser['id']));
    this.bookingStore.pipe(select(bookingSelectors.getCustomerBookings),
    takeWhile(() => this.componentActive))
    .subscribe(bookingQR => {
      //console.log(bookingQR);
      
      this.reservations = bookingQR['items'];
      
      if(this.reservations) {
        this.upcomingReservations = [];
        this.previousReservations = [];
        bookingQR['items'].forEach(item => {
          if(item['usingFrom'] > Date()) {
            this.upcomingReservations.push(item);
          } else if(item['usingFrom'] < Date()){
            this.previousReservations.push(item);
          }
        });

      }
      
    });
  }

}
