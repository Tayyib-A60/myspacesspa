import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as spaceActions from '../spaces/state/space.actions';
import * as spaceSelectors from '../spaces/state/space.selector';
import * as userSelectors from '../state/user.selector';
import * as bookingActions from '../state/booking/booking.actions';
import * as bookingSelectors from '../state/booking/booking.selector';
import { SpaceState } from '../spaces/state/space.reducers';
import { takeWhile } from 'rxjs/operators';
import { UserState } from '../state/user.reducers';
import { BookingState } from '../state/booking/booking.reducer';

@Component({
  selector: 'app-space-display',
  templateUrl: './space-display.component.html',
  styleUrls: ['./space-display.component.scss']
})
export class SpaceDisplayComponent implements OnInit {

  id: number;
  date: any;
  timeFrom = {
    hour: 6,
    minute: 0,
    second: 0
  };
  timeTo = {
    hour: 12,
    minute: 0,
    second: 0
  };
  minuteStep = 0;
  meridian = true;
  firstRating: any;
  currentRate: any;
  dateFrom: any;
  dateTo: any;
  isDisabled: any;
  componentActive = true;
  thisSpace = {};
  currentUser = {};
  bookingTimes = [];
  
  constructor(private carouselConfig: NgbCarouselConfig,
              private route: ActivatedRoute,
              private spaceStore: Store<SpaceState>,
              private userStore: Store<UserState>,
              private bookingStore: Store<BookingState>,
              private router: Router) {
    carouselConfig.showNavigationArrows = true;
    carouselConfig.interval = 0;
  }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
      this.id = params['id'];
    });
    this.spaceStore.dispatch(new spaceActions.GetSingleSpace(Number(this.id)));
    this.spaceStore.pipe(select(spaceSelectors.getSingleSpace),
        takeWhile(() => this.componentActive))
        .subscribe(space => {
          //console.log(space);
          
          this.thisSpace = space;
          // //console.log(this.thisSpace); 
    });
    
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  bookSpace() {
    const { year, month, day } = this.dateFrom;
    let yearTo = this.dateTo['year'];
    let monthTo = this.dateTo['month'];
    let dayTo = this.dateTo['day'];
    //console.log(this.timeFrom);
    
    const {hour, minute, second } = this.timeFrom;
    let hourTo = this.timeTo['hour'];
    let minuteTo = this.timeTo['minute'];
    let secondTo = this.timeTo['second'];
    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);
    const booking = {
      userId: this.thisSpace['userId'],
      spaceBooked: {
        id: this.thisSpace['id']
      },
      usingFrom: dateFrom,
      usingTill: dateTo,
      status: 'Reserved',
      bookedById: this.currentUser['id'],
      totalPrice: this.thisSpace['price']
    };
    //console.log(booking);    
    this.spaceStore.dispatch(new bookingActions.CreateReservation(booking));
    // this.router.navigate(['/profile'], {relativeTo: this.route});
  }

  checkAvailability() {
    const { year, month, day } = this.dateFrom;
    let yearTo = this.dateTo['year'];
    let monthTo = this.dateTo['month'];
    let dayTo = this.dateTo['day'];
    const {hour, minute, second } = this.timeFrom;
    //console.log(this.timeFrom);
    
    let hourTo = this.timeTo['hour'];
    let minuteTo = this.timeTo['minute'];
    let secondTo = this.timeTo['second'];
    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);
    const requestBody = {
      id: Number(this.id),
      From: dateFrom,
      To: dateTo
    };
    // //console.log(requestBody);
    
    this.spaceStore.dispatch(new bookingActions.GetBookingTimes(requestBody));
    this.spaceStore.pipe(select(bookingSelectors.getBookingTimes),
      takeWhile(() => this.componentActive))
      .subscribe(bookingTimes => {
        this.bookingTimes = bookingTimes? bookingTimes: [];
        //console.log(bookingTimes);
    });
  }

  getCustomerBooking() {
    //console.log(this.timeFrom, this.timeTo);
    // this.bookingStore.dispatch(new bookingActions.GetCustomerBookings(this.currentUser['id']));
    // this.bookingStore.pipe(select(bookingSelectors.getCustomerBookings),
    // takeWhile(() => this.componentActive))
    // .subscribe(bookingQR => {
    //   //console.log(bookingQR);
    // });
  }

}
