import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
// import { FormsModule } from '@angular/forms';
import * as bookingActions from '../../state/booking/booking.actions';
import * as bookingSelectors from '../../state/booking/booking.selector';
import { BookingState } from '../../state/booking/booking.reducer';
import { Store, select } from '@ngrx/store';
import { UserService } from '../../state/user.service';
import { SpaceService } from '../space.service';
import { Space } from '../models/space.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../state/booking/booking.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-managereservations',
  templateUrl: './managereservations.component.html',
  styleUrls: ['./managereservations.component.scss']
})
export class ManagereservationsComponent implements OnInit {

  data = [
    {
      id: 1,
      image: 'assets/img/elements/01.png',
      name: "Ethel Price",
      location: "V.I",
      price: "200,000",
      size: 200
    }
  ];
  currentOrientation = 'horizontal';
  currentUser: any;
  reservations = [];
  componentActive = true;
  merchantId = sessionStorage.getItem('currentUser')? 
  JSON.parse(sessionStorage.getItem('currentUser'))['id'] : 0;
  dateStart: any;
  dateEnd: any;
  currentPage = 1;
  searchString: string;
  merchantBookingQuery = {
    userId: this.merchantId,
    currentPage: this.currentPage,
    pageSize: 10,
    status: 'Reserved',
    searchString: this.searchString,
    dateStart: '01/01/0001',
    dateEnd: '01/01/0001'
  };
  upcomingReservations: any[];
  previousReservations: any[];
  reservation: any;
  reservationQueryResult: any;
  closeResult: string;
  user: any;
  space: Space;
  amenities: any;
  

  constructor(private bookingStore: Store<BookingState>,
              private userService: UserService,
              private spaceService: SpaceService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.fetchReservations();
    
  }

  search() {
    const dates = this.formatDates();
    if(dates.dateStart !== null && dates.dateEnd !== null) {

      this.merchantBookingQuery = { ...this.merchantBookingQuery, dateStart: dates.dateStart.toDateString(), dateEnd: dates.dateEnd.toDateString(), searchString: this.searchString };
    } 
    this.merchantBookingQuery = { ...this.merchantBookingQuery, searchString: this.searchString };
    
    this.fetchReservations();
  }

  onPageChange(page: number) {
    this.merchantBookingQuery = { ...this.merchantBookingQuery, currentPage: page };
    this.currentPage = page;

    this.fetchReservations();
  }

  private formatDates() {
    let dateFrom = null;
    if(this.dateStart) {
      let { year, month, day } = this.dateStart;

      dateFrom = new Date(year, month-1, day);
    }
    if(this.dateStart && this.dateEnd) {
      let yearTo = this.dateEnd['year'];
      let monthTo = this.dateEnd['month'];
      let dayTo = this.dateEnd['day'];

      const dateTo = new Date(yearTo, monthTo-1, dayTo);
      return { dateStart: dateFrom, dateEnd: dateTo };  
    }
    
    return { dateStart: null, dateEnd: null };  
  }

  private fetchReservations() {
    this.bookingStore.dispatch(new bookingActions.GetMerchantBookings(this.merchantBookingQuery));
    this.bookingStore.pipe(select(bookingSelectors.getMerchantBookings),
                      takeWhile(() => this.componentActive))
                      .subscribe(reservations => {
                        // //console.log(Date());
                        this.reservations = reservations['items'];
                        if(this.reservations) {
                          this.upcomingReservations = [];
                          this.previousReservations = [];
                          reservations['items'].forEach(item => {
                            if(item['usingFrom'] > Date()) {
                              this.upcomingReservations.push(item);
                            } else if(item['usingFrom'] < Date()){
                              this.previousReservations.push(item);
                            }
                          });                                      
                        }             
                  });
  }

  private getBookingDetails(booking) {
    if(booking.amenitiesSelected) {
      this.amenities = booking.amenitiesSelected.split('&');
    }
      this.userService.getUserDetails(booking.bookedById).subscribe((user) => {
        this.user = user;
        // //console.log(this.user)
      });
      this.spaceService.getSpace(booking.idOfSpaceBooked).subscribe((space: Space) => {
        this.space = space;
        // //console.log(this.space);
      },(err) => {}, () => {
      })
  }
  accept(bookingId) {
    const indexp = this.previousReservations.findIndex(rsv => rsv.id === bookingId);
    const indexu = this.upcomingReservations.findIndex(rsv => rsv.id === bookingId);

      this.bookingService.acceptReservation(bookingId).subscribe(() => {
        this.notification.typeSuccess('Reservation accepted', 'Success')
        if(indexp > -1) {
          this.previousReservations.splice(indexp, 1);
        }
        if(indexu > -1) {
          this.upcomingReservations.splice(indexu, 1);
        }
      }, (err) => {
        this.notification.typeError(`Could not accept booking ${err.message}`, 'Not Booked');
      });
  }

  open(content, booking) {
    this.reservation = booking;
    this.getBookingDetails(booking);
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

}
