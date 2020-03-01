import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpaceService } from '../space.service';
import { Space, BookingStatus } from '../models/space.model';
import { Store } from '@ngrx/store';
import * as bookingActions from '../../state/booking/booking.actions';
import * as bookingSelectors from '../../state/booking/booking.selector';
import { SpaceState } from '../state/space.reducers';
import { NotificationService } from '../../services/notification.service';
import { BookingService } from '../../state/booking/booking.service';

@Component({
  selector: 'app-manage-availability',
  templateUrl: './manage-availability.component.html',
  styleUrls: ['./manage-availability.component.scss']
})
export class ManageAvailabilityComponent implements OnInit {
  id: any;
  editMode: boolean;
  dateStart: any;
  dateEnd: any;
  timeStart = {
    hour: 6,
    minute: 0,
    second: 0
  };
  timeEnd = {
    hour: 12,
    minute: 0,
    second: 0
  };
  minuteStep = 0;
  meridian = true;
  space: Space;
  currentUser: any;
  numberOfGuests: number;
  timeToDisplayArray: any;
  clicked: number;
  bookingTimes: any[];
  timesAlreadyTaken: any;
  timesMap: Map<any, any>;
  bookEnabled: boolean;

  constructor(private route: ActivatedRoute,
              private spaceService: SpaceService,
              private spaceStore: Store<SpaceState>,
              private notification: NotificationService,
              private bookingService: BookingService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
        });
        this.spaceService.getSpace(Number(this.id)).subscribe((space: Space) => {
          this.space = space;
          //console.log(space);
        });
  }
  

  checkAvailability(event) {
    if(event.target.checked) {
    this.timeToDisplayArray = [];
    this.timesAlreadyTaken = new Map();
    this.timesMap = new Map();
    
    const { year, month, day } = this.dateStart;
    let yearTo = this.dateEnd['year'];
    let monthTo = this.dateEnd['month'];
    let dayTo = this.dateEnd['day'];

    const {hour, minute, second } = this.timeStart;
    let hourTo = this.timeEnd['hour'];
    let minuteTo = this.timeEnd['minute'];
    let secondTo = this.timeEnd['second'];
    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);

    const requestBody = {
      id: Number(this.id),
      From: dateFrom,
      To: dateTo
    };
    
    let items = [];

    this.bookingService.getBookingTimes(requestBody).subscribe((bookingTimes: any[])  => {
      this.clicked += 1;
      this.bookingTimes = bookingTimes? bookingTimes: [];
      this.bookEnabled = bookingTimes.length > 0 ? true : false;
      let timesMap = new Map();

      if(bookingTimes) {
        for(let i = 0; i < bookingTimes.length; i++) {

          const date = bookingTimes[i].from.substr(0,10);
          const from = new Date(bookingTimes[i].from).getUTCHours() + 1;
          const to = new Date(bookingTimes[i].to).getUTCHours() + 1;

          if(timesMap.has(date)){
            let temp = timesMap.get(date);
            temp.push({from, to, available: false})
              timesMap.set(date,temp);
          } else {
            timesMap.set(date, [{from, to, available: false}]);
          }
        }
        this.timesAlreadyTaken.clear();
        this.timesAlreadyTaken = timesMap;
    
    // if(this.timesAlreadyTaken) {
      this.timesAlreadyTaken.forEach((time,day) => {
        let missingTimes = [];
        
        time.sort(d => d.from);

        if(time.length === 1) {
          
          if(time[0].from > 0) {
            missingTimes.push({from: 0, to: time[0].from, available: true});
          }

          if(time[0].to < 24) {
            missingTimes.push({from: time[0].to, to: 24, available: true});
          }

        }

        if(time.length > 1) {
          
          if(time[0].from < 1) {
            missingTimes.push({from: 0, to: time[0].from, available: true});
          }

          for(let i = 1; i < time.length; i++) {
            missingTimes.push({from: time[i-1].to, to: time[i].from, available: true});
          }

          if(time[0].to < 24) {
            missingTimes.push({from: time[0].to, to: 24, available: true});
          }
        }
        let times = [...time,...missingTimes];            
        times.sort((a,b) => a.from - b.from);

        this.timeToDisplayArray.push({day, times});

      });
      if(this.timeToDisplayArray.length === 0) {

        this.notification.typeSuccess('This space is available for the selected time','Available')
      } else if(this.timeToDisplayArray.length > 0) {
        this.notification.typeWarning('Space not available for selected date/time', 'Not Available');
      }
      }
    });
  }
  }


  bookSpace() {
    if(this.currentUser === null) {
      // this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    }
    const { year, month, day } = this.dateStart;
    let yearTo = this.dateEnd['year'];
    let monthTo = this.dateEnd['month'];
    let dayTo = this.dateEnd['day'];
    let {hour, minute, second } = this.timeStart;
    hour = this.space.selectedPricingOption === 1 ? 0 : hour;
    minute = this.space.selectedPricingOption === 1 ? 1 : minute;
    let hourTo = this.space.selectedPricingOption === 1 ? 23 :this.timeEnd['hour'];
    let minuteTo = this.space.selectedPricingOption === 1 ? 59: this.timeEnd['minute'];
    let secondTo = this.timeEnd['second'];
    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);

    let amenitiesPrice = 0;
    //console.log(this.dateStart, this.dateEnd);
    //console.log(dateFrom, dateTo);
    
    // this.amenitiesSelected.forEach(amenity => {
    //   amenitiesPrice += amenity.price;
    // });
    let usingTimes = [];

    if(dayTo > day && month === monthTo) {
      for(let i = day; i <= dayTo; i++) {
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, monthTo-1, i, hourTo+1, minuteTo, secondTo);
        usingTimes.push({usingFrom: from, usingTill: to});
      }
    }
    if(month < monthTo) {
      let lastDay = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0);
      
      for(let i = day; i <= day + (lastDay.getDate() - day) + dayTo; i++) {        
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, month-1, i, hourTo+1, minuteTo, secondTo);
        usingTimes.push({usingFrom: from, usingTill: to})
      }
    }
    if(usingTimes.length == 0) {
      usingTimes.push({usingFrom: dateFrom, usingTill: dateTo});
    }

    const booking = {
      userId: this.space['userId'],
      idOfSpaceBooked: this.space['id'],
      usingTimes: [
        ...usingTimes
      ],
      status: BookingStatus.Booked,
      bookedById: this.currentUser['id'],
      totalPrice: 0,
      noOfGuests: 0,
      createdByOwner: true
    };
    this.spaceStore.dispatch(new bookingActions.CreateReservation(booking));
  }

}
