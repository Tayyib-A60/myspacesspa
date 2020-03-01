import { SpaceQueryResult } from './../models/spaceQueryResult';
import { Space, BookingStatus } from './../models/space.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as spaceActions from './../state/space.actions';
import * as spaceReducer from './../state/space.reducers';
import * as spaceSelectors from './../state/space.selector';
import * as bookingActions from '../../state/booking/booking.actions';
import * as bookingSelectors from '../../state/booking/booking.selector';
import { SpaceState } from '../state/space.reducers';
import { SpaceService } from '../space.service';
import { NotificationService } from '../../services/notification.service';
import { BookingService } from 'src/app/state/booking/booking.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-book-for-client',
  templateUrl: './book-for-client.component.html',
  styleUrls: ['./book-for-client.component.scss']
})
export class BookForClientComponent implements OnInit {

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
  currentUser: any;
  spaceId: number;
  numberOfGuests: number;
  spaces: Space[];
  timeToDisplayArray: any;
  bookingTimes: any[];
  clicked: number;
  timesAlreadyTaken: Map<any, any>;
  timesMap: Map<any, any>;
  bookEnabled: boolean;
  name: string;
  email: string;
  phone: string;
  merchantQuery: { userId: any; currentPage: number; pageSize: number; };
  componentActive = true;
  spaceQueryResult: SpaceQueryResult;
  spaceSelected: Space;
  totalCost: number = 0;
  amenitiesSelected: any[] = [];
  isBooking: boolean;

  
  constructor(private route: ActivatedRoute,
    private spaceService: SpaceService,
    private spaceStore: Store<SpaceState>,
    private notification: NotificationService,
    private bookingService: BookingService,
    private store: Store<spaceReducer.SpaceState>) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.merchantQuery = { userId: this.currentUser? this.currentUser.id : null, currentPage: 1, pageSize: 255 };

    this.store.dispatch(new spaceActions.GetMerchantSpaces(this.merchantQuery));

    this.store.pipe(select(spaceSelectors.getMerchantSpaces),
    takeWhile(() => this.componentActive))
    .subscribe(spaceQR => {
      this.spaceQueryResult = spaceQR;
      this.spaces = spaceQR['items'];
    });
    // }
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
      id: Number(this.spaceId),
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
      console.log(this.timeToDisplayArray);
      
      if(this.timeToDisplayArray.length === 0) {
        this.notification.typeSuccess('This space is available for the selected time','Available')
      } else if(this.timeToDisplayArray.length > 0) {
        this.notification.typeWarning('Space not available for selected date/time', 'Not Available');
      }
    }
    });
  }
  }

  amenityChecked(event) {    
    if(event.target.checked) {
      const amenityIndex = this.spaceSelected.amenities.findIndex(a => a['id'] === Number(event.target.value));
      this.totalCost += this.spaceSelected.amenities[amenityIndex].price;
      this.amenitiesSelected.push(this.spaceSelected.amenities[amenityIndex]);
    }
    if(!event.target.checked) {
      const index = this.amenitiesSelected.findIndex(a => a['id'] === Number(event.target.value));
      this.totalCost -= this.amenitiesSelected[index].price;
      this.amenitiesSelected.splice(index, 1);
    }    
  }

  setSelected(event) {
    this.spaceSelected = this.spaces.find(sp => sp.id === event);
    console.log(this.spaceSelected);
    
    this.spaceService.getSpace(event).subscribe((space: Space) => {
      this.spaceSelected = space;
    });
  }
  
  bookSpace() {
    if(this.currentUser === null) {
      this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    }
    
    const { year, month, day } = this.dateStart;
    let yearTo = this.dateEnd['year'];
    let monthTo = this.dateEnd['month'];
    let dayTo = this.dateEnd['day'];
    let {hour, minute, second } = this.timeStart;
    hour = this.spaceSelected? this.spaceSelected.selectedPricingOption === 1 ? 0 : hour : 0;
    minute = this.spaceSelected? this.spaceSelected.selectedPricingOption === 1 ? 1 : minute : 1;
    let hourTo = this.spaceSelected? this.spaceSelected.selectedPricingOption === 1 ? 23 : this.timeEnd['hour'] : this.timeEnd['hour'];
    let minuteTo = this.spaceSelected? this.spaceSelected.selectedPricingOption === 1 ? 59: this.timeEnd['minute'] : this.timeEnd['minute'];
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

    let amenities = "";
    this.amenitiesSelected.forEach(amenity => {
      amenitiesPrice += amenity.price;
      amenities += amenity.name + "&";
    });
    amenities = amenities.substr(0, amenities.length-1);

    for(let i = 0; i < usingTimes.length; i++) {
      if(this.spaceSelected.selectedPricingOption == 0) {
        this.totalCost += (usingTimes[i].usingTill.getUTCHours() - usingTimes[i].usingFrom.getUTCHours()) * this.spaceSelected.price;
      } else if (this.spaceSelected.selectedPricingOption == 1) {
        this.totalCost += this.spaceSelected.price;
      }
  }
    // console.log(this.totalCost);
    
    const booking = {
      userId: this.spaceSelected['userId'],
      idOfSpaceBooked: this.spaceSelected['id'],
      usingTimes: [
        ...usingTimes
      ],
      amenities: amenities,
      status: this.isBooking? BookingStatus.Booked: BookingStatus.Reserved,
      bookedById: this.currentUser['id'],
      totalPrice: this.totalCost,
      noOfGuests: 0,
      createdByOwner: true,
      bookedForName: this.name,
      bookedForEmail: this.email,
      bookedForPhone: this.phone
    };
    console.log(booking);
    
    this.spaceStore.dispatch(new bookingActions.CreateReservation(booking));
  }

  reserveSpace() {
    if(this.currentUser === null) {
      this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    }
    const { year, month, day } = this.dateStart;
    let yearTo = this.dateEnd['year'];
    let monthTo = this.dateEnd['month'];
    let dayTo = this.dateEnd['day'];
    let {hour, minute, second } = this.timeStart;
    hour = this.spaceSelected.selectedPricingOption === 1 ? 0 : hour;
    minute = this.spaceSelected.selectedPricingOption === 1 ? 1 : minute;
    let hourTo = this.spaceSelected.selectedPricingOption === 1 ? 23 :this.timeEnd['hour'];
    let minuteTo = this.spaceSelected.selectedPricingOption === 1 ? 59: this.timeEnd['minute'];
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
      userId: this.spaceSelected['userId'],
      idOfSpaceBooked: this.spaceSelected['id'],
      usingTimes: [
        ...usingTimes
      ],
      status: BookingStatus.Reserved,
      bookedById: this.currentUser['id'],
      totalPrice: this.totalCost,
      noOfGuests: 0,
      createdByOwner: true,
      bookedForName: this.name,
      bookedForEmail: this.email,
      bookedForPhone: this.phone
    };
    console.log(booking);
    
    // this.spaceStore.dispatch(new bookingActions.CreateReservation(booking));
  }

}
