import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedService } from './../services/shared.service';
import { NotificationService } from './../services/notification.service';
import { Store, select } from '@ngrx/store';
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
import { Space, Amenity, BookingStatus } from '../spaces/models/space.model';
import { SpaceService } from '../spaces/space.service';
import { BookingService } from '../state/booking/booking.service';

@Component({
  selector: 'app-new-space',
  templateUrl: './new-space.component.html',
  styleUrls: ['./new-space.component.scss']
})
export class NewSpaceComponent implements OnInit {

  id: number;
  date: any;
  dateStart: any;
  noOfPersons: number;
  modalNoOfPersons: number;
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
  modalTimeFrom = {
    hour: 6,
    minute: 0,
    second: 0
  };
  modalTimeTo = {
    hour: 12,
    minute: 0,
    second: 0
  };
  contactUsForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
    user234SpacesEmail: '',
    spaceOwnerId: 0
  };
  amenitiesSelected = <Amenity[]>[];
  minuteStep = 0;
  meridian = true;
  firstRating: any;
  currentRate: any;
  dateFrom: any;
  dateTo: any;
  modalDateFrom: any;
  modalDateTo: any;
  isDisabled: any;
  componentActive = true;
  thisSpace = <Space>{};
  currentUser = {};
  totalCost = 0;
  bookingTimes = [];
  loaded: boolean;
  latitude: number;
  longitude: number;
  closeResult: string;
  usingTimes: {usingFrom: Date, usingTill: Date}[];
  beginsOn: any;
  endOn: any;
  usingTimeArray = [];
  numberOfGuests: number;
  timesAlreadyTaken: Map<string, {from: number, to: number, available: boolean}[]>;
  timesToDisplay: Map<string, {from: number, to: number, available: boolean}[]>;
  timeToDisplayArray: any[] = [];
  timesMap: any;
  modalBookingTimes: any;
  modalTimesAlreadyTaken: Map<string, {from: number, to: number, available: boolean}[]>;
  modalTimeToDisplayArray: any[] = [];
  clicked: number = 0;
  
  constructor(private carouselConfig: NgbCarouselConfig,
              private route: ActivatedRoute,
              private spaceStore: Store<SpaceState>,
              private userStore: Store<UserState>,
              private bookingStore: Store<BookingState>,
              private router: Router,
              private notification: NotificationService,
              private sharedService: SharedService,
              private spaceService: SpaceService,
              private bookingService: BookingService,
              private modalService: NgbModal) {
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
          //console.log(space.selectedPricingOption);
          this.thisSpace = space;
          this.loaded = true; 
    });
    // var dated = new Date("2020-02-08T18:00:00");
    // //console.log(new Date(dated.getFullYear(), dated.getMonth(), dated.getDate()));
    // let timesMap = new Map();
    // timesMap.set(1,['hello']);
    // timesMap.set(2,'hell');
    // timesMap.set(3,'hel');
    // timesMap.set(4,'he');
    // //console.log();
    // if(timesMap.has(1)){
    //   let temp = timesMap.get(1);
    //   temp.push('I added u')
    //     timesMap.set(1,temp);
    // }
    // //console.log(timesMap);
    
    
    navigator.geolocation.getCurrentPosition((myLocation) => {
      this.latitude = myLocation.coords.latitude;
      this.longitude = myLocation.coords.longitude;
    });
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  amenityChecked(event) {    
    if(event.target.checked) {
      const amenityIndex = this.thisSpace.amenities.findIndex(a => a['id'] === Number(event.target.value));
      this.totalCost += this.thisSpace.amenities[amenityIndex].price;
      this.amenitiesSelected.push(this.thisSpace.amenities[amenityIndex]);
    }
    if(!event.target.checked) {
      const index = this.amenitiesSelected.findIndex(a => a['id'] === Number(event.target.value));
      this.totalCost -= this.amenitiesSelected[index].price;
      this.amenitiesSelected.splice(index, 1);
    }
    
  }

  sendEnquiry() {
    this.contactUsForm.user234SpacesEmail = this.currentUser['email'];
    this.contactUsForm.spaceOwnerId = this.thisSpace.userId;
    this.sharedService.postEnquiry(this.contactUsForm)
    .subscribe((res) => {
      this.notification.typeSuccess('Success', 'Your message was sent successfully')
    }, (err) => {
      this.notification.typeError('Failed', `${err.message}`);
    })
    // //console.log(this.contactUsForm);
    
  }

  addAdditionalBooking() {
    const { year, month, day } = this.modalDateFrom;
    let yearTo = this.modalDateTo['year'];
    let monthTo = this.modalDateTo['month'];
    let dayTo = this.modalDateTo['day'];
    
    const {hour, minute, second } = this.modalTimeFrom;
    let hourTo = this.modalTimeTo['hour'];
    let minuteTo = this.modalTimeTo['minute'];
    let secondTo = this.modalTimeTo['second'];
    
    const modalDateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const modalDateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);

    this.usingTimeArray.push({ from: modalDateFrom, to: modalDateTo });

    if(dayTo > day && month === monthTo) {
      for(let i = day; i <= dayTo; i++) {
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, monthTo-1, i, hourTo+1, minuteTo, secondTo);
        this.usingTimes.push({usingFrom: from, usingTill: to});
      }
    }
    if(month < monthTo) {
      let lastDay = new Date(modalDateFrom.getFullYear(), modalDateFrom.getMonth() + 1, 0);
      for(let i = day; i <= day + (lastDay.getDate() - day) + dayTo; i++) {        
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, month-1, i, hourTo+1, minuteTo, secondTo);
        this.usingTimes.push({usingFrom: from, usingTill: to})
      }
    }
    // //console.log(this.usingTimes);
  }

  bookSpace() {
    if(this.currentUser === null) {
      this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    } 

    const { year, month, day } = this.dateFrom;
    let yearTo = this.dateTo['year'];
    let monthTo = this.dateTo['month'];
    let dayTo = this.dateTo['day'];

    let {hour, minute, second } = this.timeFrom;
    hour = this.thisSpace.selectedPricingOption === 1 ? 0 : hour;
    minute = this.thisSpace.selectedPricingOption === 1 ? 1 : minute;
    let hourTo = this.thisSpace.selectedPricingOption === 1 ? 23 :this.timeTo['hour'];
    let minuteTo = this.thisSpace.selectedPricingOption === 1 ? 59: this.timeTo['minute'];
    let secondTo = this.timeTo['second'];

    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);

    this.usingTimeArray.push({ from: dateFrom, to: dateTo });
    this.usingTimeArray.sort((a,b) => a.to - b.to);

    let amenitiesPrice = 0;
    this.amenitiesSelected.forEach(amenity => {
      amenitiesPrice += amenity.price;
    });

    if(dayTo > day && month === monthTo) {
      for(let i = day; i <= dayTo; i++) {
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, monthTo-1, i, hourTo+1, minuteTo, secondTo);
        this.usingTimes.push({usingFrom: from, usingTill: to});
      }
    }
    if(month < monthTo) {
      let lastDay = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0);
      for(let i = day; i <= day + (lastDay.getDate() - day) + dayTo; i++) {        
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, month-1, i, hourTo+1, minuteTo, secondTo);
        this.usingTimes.push({usingFrom: from, usingTill: to})
      }
    }

    for(let i = 0; i < this.usingTimes.length; i++) {
        if(this.thisSpace.selectedPricingOption === 0) {
          this.totalCost += (this.usingTimes[i].usingTill.getUTCHours() - this.usingTimes[i].usingFrom.getUTCHours()) * this.thisSpace.price;
        } else if (this.thisSpace.typeId === 1) {
          this.totalCost += this.thisSpace.price;
        }
    }
     
    const booking = {
      userId: this.thisSpace['userId'],
      spaceBooked: {
        id: this.thisSpace['id']
      },
      usingTimes: [
        ...this.usingTimes
      ],
      timeToUseSpace: {
        from: this.usingTimeArray[0].from,
        to: this.usingTimeArray[this.usingTimeArray.length-1].to
      },
      status: BookingStatus.Booked,
      bookedById: this.currentUser['id'],
      numberOfGuests: this.numberOfGuests,
      totalPrice: this.totalCost
    };
    sessionStorage.setItem('bookingToCreate', JSON.stringify(booking));
    sessionStorage.setItem('amenitiesSelected', JSON.stringify(this.amenitiesSelected));
    this.spaceStore.dispatch(new bookingActions.AddBookingToStore(booking));
    this.router.navigate([`/booking-request/${this.thisSpace['id']}`]);
  }

  reserveSpace() {
    if(this.currentUser === null) {
      this.notification.typeInfo('Please sign in to book this space', 'Info');
      return;
    }
    const { year, month, day } = this.dateFrom;
    let yearTo = this.dateTo['year'];
    let monthTo = this.dateTo['month'];
    let dayTo = this.dateTo['day'];
    const {hour, minute, second } = this.timeFrom;
    let hourTo = this.timeTo['hour'];
    let minuteTo = this.timeTo['minute'];
    let secondTo = this.timeTo['second'];
    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);

    let amenitiesPrice = 0;
    let amenities = "";
    this.amenitiesSelected.forEach(amenity => {
      amenitiesPrice += amenity.price;
      amenities += amenity.name + "&";
    });
    amenities = amenities.substr(0, amenities.length-1);
    // //console.log(amenities);
    
    let usingTimes = [];

    if(dayTo > day && month === monthTo) {
      for(let i = day; i <= dayTo; i++) {
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, monthTo-1, i, hourTo+1, minuteTo, secondTo);
        usingTimes.push({usingFrom: from, usingTill: to});
        // //console.log(usingTimes);
      }
    }
    if(month < monthTo) {
      let lastDay = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0);
      // //console.log(lastDay.getDate());
      
      for(let i = day; i <= day + (lastDay.getDate() - day) + dayTo; i++) {        
        const from = new Date(year, month-1, i, hour+1, minute, second);
        const to = new Date(yearTo, month-1, i, hourTo+1, minuteTo, secondTo);
        usingTimes.push({usingFrom: from, usingTill: to})
      }
      // //console.log(usingTimes);
    }
    if(usingTimes.length == 0) {
      usingTimes.push({usingFrom: dateFrom, usingTill: dateTo});
    }

    for(let i = 0; i < usingTimes.length; i++) {
      if(this.thisSpace.selectedPricingOption == 0) {
        this.totalCost += (usingTimes[i].usingTill.getUTCHours() - usingTimes[i].usingFrom.getUTCHours()) * this.thisSpace.price;
      } else if (this.thisSpace.selectedPricingOption == 1) {
        this.totalCost += this.thisSpace.price;
      }
  }

    const booking = {
      userId: this.thisSpace['userId'],
      amenitiesSelected: amenities,
      idOfSpaceBooked: this.thisSpace['id'],
      usingTimes: [
        ...usingTimes
      ],
      status: BookingStatus.Reserved,
      bookedById: this.currentUser['id'],
      totalPrice: this.totalCost,
      noOfGuests: this.numberOfGuests,
      createdByOwner: false
    };
    //console.log(booking);    
    // this.spaceStore.dispatch(new bookingActions.CreateReservation(booking));
    // this.router.navigate(['/profile'], {relativeTo: this.route});

    sessionStorage.setItem('bookingToCreate', JSON.stringify(booking));
    sessionStorage.setItem('amenitiesSelected', JSON.stringify(this.amenitiesSelected));
    this.spaceStore.dispatch(new bookingActions.AddBookingToStore(booking));
    this.router.navigate([`/booking-request/${this.thisSpace['id']}`]);
  }

  check() {
    let items = [];
    items.push('hi there');
    //console.log(items);
    
  }

  // checkForAvailablity(event) {   
      // if(event.target.checked) {
      //   this.checkAvailability();
      // }
  // }
  checkAvailability(event) {
    if(event.target.checked) {
    this.timeToDisplayArray = [];
    this.timesAlreadyTaken = new Map();
    this.timesMap = new Map();
    
    const { year, month, day } = this.dateFrom;
    let yearTo = this.dateTo['year'];
    let monthTo = this.dateTo['month'];
    let dayTo = this.dateTo['day'];

    const {hour, minute, second } = this.timeFrom;
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
    
    let items = [];

    this.bookingService.getBookingTimes(requestBody).subscribe((bookingTimes: any[])  => {
      this.clicked += 1;
      this.bookingTimes = bookingTimes? bookingTimes: [];
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
      // else if(this.clicked < 2 ) {
      //   this.notification.typeInfo('Please uncheck and check the checkbox again', 'Info');
      // }
      //console.log(this.timeToDisplayArray);
    // }
      }
    });
  }
  }
  checkModalAvailability(event) {
    if(event.target.checked) {
    this.modalTimeToDisplayArray = [];
    this.modalTimesAlreadyTaken = new Map();
    this.timesMap = new Map();
    
    const { year, month, day } = this.modalDateFrom;
    let yearTo = this.modalDateTo['year'];
    let monthTo = this.modalDateTo['month'];
    let dayTo = this.modalDateTo['day'];

    const {hour, minute, second } = this.modalTimeFrom;
    let hourTo = this.modalTimeTo['hour'];
    let minuteTo = this.modalTimeTo['minute'];
    let secondTo = this.modalTimeTo['second'];
    const dateFrom = new Date(year, month-1, day, hour+1, minute, second);
    const dateTo = new Date(yearTo, monthTo-1, dayTo, hourTo+1, minuteTo, secondTo);

    const requestBody = {
      id: Number(this.id),
      From: dateFrom,
      To: dateTo
    };
    
    let items = [];

    this.spaceStore.dispatch(new bookingActions.GetBookingTimes(requestBody));

    this.bookingService.getBookingTimes(requestBody).subscribe((bookingTimes: any[]) => {

        this.modalBookingTimes = bookingTimes? bookingTimes: [];
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
          this.modalTimesAlreadyTaken.clear();
          this.modalTimesAlreadyTaken = timesMap;
          
        }
    }, (err) => {
    }, () => {
            
    });
    
    // if(this.timesAlreadyTaken) {
      this.modalTimesAlreadyTaken.forEach((time,day) => {
        let missingTimes = [];
        //console.log('I got called');
        
        time.sort(d => d.from);

        if(time.length === 1) {
          //console.log('I got called too');
          
          if(time[0].from > 0) {
            missingTimes.push({from: 0, to: time[0].from, available: true});
          }

          if(time[0].to < 24) {
            missingTimes.push({from: time[0].to, to: 24, available: true});
          }

        }

        if(time.length > 1) {
          //console.log('Day length is now more than 1');
          
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

        this.modalTimeToDisplayArray.push({day, times});

      });
      //console.log(this.modalTimeToDisplayArray);
    // }

  }
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
