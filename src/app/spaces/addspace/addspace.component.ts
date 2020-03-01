import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as spaceReducer from '../state/space.reducers';
import * as spaceActions from '../state/space.actions';
import * as spaceSelectors from '../state/space.selector';
import { Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SpaceType } from '../models/spaceType.model';
import { takeWhile } from 'rxjs/operators';
import { Space, LocationDetails, PricingOption } from '../models/space.model';
import { HttpClient } from '@angular/common/http';
import { SpaceService } from '../space.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-addspace',
  templateUrl: './addspace.component.html',
  styleUrls: ['./addspace.component.scss']
})
export class AddspaceComponent implements OnInit, AfterViewInit {

  amenityItems = [ ];
  someLocation: string;
  selectedSpaceType: number;
  spaceForm: FormGroup = new FormGroup({});
  id: string;
  editMode = false;
  spaceTypes$: Observable<SpaceType[]>;
  componentActive = true;
  spaceTypes: SpaceType[];
  selectedPricingOption: number;
  pricingOptions: any[];
  spaceToEdit: Space;
  currentUser: any;
  latitude = 0;
  longitude = 0;
  infoWindow: any;
  selectedLocation = '';
  amenities = [];
  address: Object;
  establishmentAddress: Object;
  initForm = false;
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  phone: string;
  closeResult: string;

    constructor(private formBuilder: FormBuilder,
                private store: Store<spaceReducer.SpaceState>,
                private route: ActivatedRoute,
                private httpClient: HttpClient,
                public zone: NgZone,
                private spaceService: SpaceService,
                private modalService: NgbModal,
                private notificationService: NotificationService) { }
                
    ngOnInit() {
      this.pricingOptions = [{ type: PricingOption.Hourly, label: "Hourly"}, { type: PricingOption.Daily , label: "Daily"}];
      // if(!this.editMode) {
      //   navigator.geolocation.getCurrentPosition((myLocation) => {
      //     this.latitude = myLocation.coords.latitude;
      //     this.longitude = myLocation.coords.longitude;

      //   });
      // }

      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
        });

        if(this.editMode) {
          this.initFormWithValues();
        }

        if(!this.editMode) {
          this.initializeForm();
        }

      this.store.dispatch(new spaceActions.GetSpaceTypes());
      this.store.pipe(select(spaceSelectors.getSpaceTypes),
      takeWhile(() => this.componentActive))
      .subscribe(spaceTypes => {        
        this.spaceTypes = spaceTypes;
      });
        
    }

    private initFormWithValues() {
      this.spaceService.getSpace(Number(this.id)).subscribe((space: Space) => {
        //console.log(space);
        let amenitiesArray = new FormArray([]);
        if(space.amenities) {                
            space.amenities.map(a => {
              amenitiesArray.push(
                new FormGroup({
                  'name': new FormControl(a['name'], Validators.required),
                  'price': new FormControl(a['price'], Validators.required),
                  'id': new FormControl(a['id'])
                })
              );
            }); 
        } 
        this.selectedSpaceType = space.typeId;
        this.selectedPricingOption = space.selectedPricingOption;
        this.spaceForm = new FormGroup({
          'id': new FormControl(space.id, Validators.required),
          'name': new FormControl(space.name, [Validators.required,  Validators.minLength(3),
                                        Validators.maxLength(50)]),
          'minimumTerm': new FormControl(space.minimumTerm, [Validators.required,  Validators.minLength(3), Validators.maxLength(50)]),
          'locationAddress': new FormControl(space.locationAddress, Validators.required),
          'long': new FormControl(space.long, Validators.required),
          'lat': new FormControl(space.lat, Validators.required),
          'description': new FormControl(space.description, Validators.required),
          'size': new FormControl(space.size, Validators.required),
          'price': new FormControl(space.price, Validators.required),
          'discount': new FormControl(space.discount, Validators.required),
          'amenities': amenitiesArray,
          'userId': new FormControl(this.currentUser['id']),
          'typeId': new FormControl(space.typeId),
          'selectedPricingOption': new FormControl(space.selectedPricingOption)
        });
        this.spaceToEdit = space;
      }, (err) => {//console.log(err.message));
      });
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

    ngOnDestroy(): void {
      this.componentActive = false;
    }

    ngAfterViewInit() {
      // if(this.spaceToEdit){
      //   this.latitude = Number(this.spaceToEdit.location.lat);
      //   this.longitude = Number(this.spaceToEdit.location.long);
      // }
    }

    saveAmenities() {
      const amenities = this.spaceForm.get('amenities').value;
      const amenitiesToCreate = {
        amenities,
        spaceId: this.spaceToEdit.id
      };
      for(let i = 0; i < amenitiesToCreate.amenities.length; i++) {
          delete amenitiesToCreate.amenities[i].id;
      }
      //console.log(amenitiesToCreate);
      // const spaceObject = this.spaceForm.value;
      // //console.log(spaceObject);
      // delete spaceObject['amenities'];
      // //console.log(spaceObject);
      this.spaceService.createAmenities(amenitiesToCreate).subscribe((res) => {
        this.notificationService.typeSuccess('Amenities added', 'Success');
      },(err) => {
        this.notificationService.typeError(`${err.message}`, 'Failed');
      },() => {
        this.initFormWithValues();
      });
      
    }

    getAddress(place: object) {
      // this.address = place['formatted_address'];
      // this.phone = this.getPhone(place);
      this.formattedAddress = place['formatted_address'];
      this.zone.run(() => {
        this.formattedAddress = place['formatted_address'];
      });
    }
    getAddressDetails(locationDetails: LocationDetails) {
      const { locationName, long, lat } = locationDetails;
      this.latitude = Number(lat);
      this.longitude = Number(long);
      this.zone.run(() => {
        this.spaceForm.get('long').patchValue(long);
        this.spaceForm.get('lat').patchValue(lat);
        this.spaceForm.get('locationAddress').patchValue(locationName);
      });
    }

    getPhone(place) {
      const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
        phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
      return phone;
    }

    getAddrComponent(place, componentTemplate) {
      let result;
  
      for (let i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (componentTemplate[addressType]) {
          result = place.address_components[i][componentTemplate[addressType]];
          return result;
        }
      }
      return;
    }

    onLocationSelect(event) {
      // this.latitude = event.coords.lat;
      // this.longitude = event.coords.lng;
      // this.spaceForm.get('locationLong').patchValue(event.coords.lng);
      // this.spaceForm.get('locationLat').patchValue(event.coords.lat);
      // this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.coords.lat},
      // ${event.coords.lng}&key=AIzaSyDqDa-Jf1KhEOO0FXyJwReGiquRMCaz9Bs`).subscribe(res => {
      //   const { formatted_address } = res['results'][0];
      //   //console.log(res);
      //   this.spaceForm.get('locationName').patchValue(formatted_address);
      //   this.selectedLocation = formatted_address;
      //   //console.log(this.selectedLocation);
      // })      
    }

    onPinSelect(event) {
      // //console.log('Marker clicked', event);
      // let myCenter =new google.maps.LatLng(this.latitude, this.longitude);

      // let marker = new google.maps.Marker({
      //     position:myCenter,
      //     animation:google.maps.Animation.DROP
      // });
    }

    private initializeForm() {
      let amenitiesArray = new FormArray([]);
      let name = '';
      let minimumTerm = '';
      let pricingOption = '';
      let locationName = '';
      let locationLong = '';
      let locationLat = '';
      let size = null;
      let type = {type: '', id: null};
      let stid = 0;
      let description =  '';
      let price = null;
      let discount = null;
      let currentUserId = this.currentUser['id'];
      let selectedPricingOption = this.selectedPricingOption;
      
      this.spaceForm = new FormGroup({
          'id': new FormControl(this.id, Validators.required),
          'name': new FormControl(name, [Validators.required,  Validators.minLength(3),
                                        Validators.maxLength(50)]),
          'minimumTerm': new FormControl(minimumTerm, [Validators.required,  Validators.minLength(3),
                                        Validators.maxLength(50)]),
          'locationAddress': new FormControl(locationName, Validators.required),
          'long': new FormControl(locationLong, Validators.required),
          'lat': new FormControl(locationLat, Validators.required),
          'description': new FormControl(description, Validators.required),
          'size': new FormControl(size, Validators.required),
          'price': new FormControl(price, Validators.required),
          'discount': new FormControl(discount, Validators.required),
          'amenities': amenitiesArray,
          // 'userId': new FormControl(currentUserId, Validators.required),
          'typeId': new FormControl(stid),
          'selectedPricingOption': new FormControl(selectedPricingOption, Validators.required)
        });
    }

    // private intializeFormWtValues() {
      
    //   // if(this.editMode) {
    //     // fetch the space to edit nd initialize the form to contain it's properties here.
    //     let amenitiesArray = new FormArray([]);
    //     let name = '';
    //     let minimumTerm = '';
    //     let locationLong = '';
    //     let locationLat = '';
    //     let locationName = '';
    //     let size = null;
    //     let description =  '';
    //     let spaceType = null;
    //     let selectedPricingOption = null;
    //     let pricing = null;
    //     let discount = null;
    //     let amenities = null;
    //     let currentUserId = this.currentUser['id'];

    //     if(this.spaceToEdit) {
    //         locationLong = this.spaceToEdit.long;
    //         locationLat = this.spaceToEdit.lat;
    //         locationName = this.spaceToEdit.locationAddress;
    //         name = this.spaceToEdit.name;
    //         minimumTerm = this.spaceToEdit.minimumTerm;      
    //         description = this.spaceToEdit.description;
    //         size = this.spaceToEdit.size;
    //         pricing = this.spaceToEdit.price;
    //         discount = this.spaceToEdit.discount;
    //         this.selectedSpaceType = this.spaceToEdit.typeId;
    //         this.selectedPricingOption = this.spaceToEdit.selectedPricingOption;
    //         amenities = this.spaceToEdit.amenities;
    //     }
       
        
    //     // let amenitiesArray = new FormArray([]);
    //     if(amenities) {                
    //         amenities.map(a => {
    //           amenitiesArray.push(
    //             new FormGroup({
    //               'name': new FormControl(a['name'], Validators.required),
    //               'price': new FormControl(a['price'], Validators.required),
    //               'id': new FormControl(a['id'])
    //             })
    //           );
    //         }); 
    //     } 
            
    //     this.spaceForm = new FormGroup({
    //       'id': new FormControl(this.id, Validators.required),
    //       'name': new FormControl(name, [Validators.required,  Validators.minLength(3),
    //                                     Validators.maxLength(50)]),
    //       'minimumTerm': new FormControl(minimumTerm, [Validators.required,  Validators.minLength(3),
    //                                     Validators.maxLength(50)]),
    //       'locationAddress': new FormControl(locationName, Validators.required),
    //       'long': new FormControl(locationLong, Validators.required),
    //       'lat': new FormControl(locationLat, Validators.required),
    //       'description': new FormControl(description, Validators.required),
    //       'size': new FormControl(size, Validators.required),
    //       'price': new FormControl(pricing, Validators.required),
    //       'discount': new FormControl(discount, Validators.required),
    //       'amenities': amenitiesArray,
    //       'userId': new FormControl(currentUserId),
    //       'typeId': new FormControl(this.selectedSpaceType),
    //       'selectedPricingOption': new FormControl(this.selectedPricingOption)
    //     });        
    //   // }
    // }

    addAmenity() {
      (<FormArray>this.spaceForm.get('amenities')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'price': new FormControl(null, Validators.required)
        })
      );      
    }
    
    removeAmenity(index: number) {
      (<FormArray>this.spaceForm.get('amenities')).removeAt(index);
    }

    toggleCheckbox(item) {
      if(item.currentTarget.checked) {
        this.amenityItems.push(item.currentTarget.id);
      } else {
        this.amenityItems.splice((this.amenityItems.indexOf(item.currentTarget.id),1));
      }
    }

    createSpace() {
      
      if(this.editMode) {
        this.spaceForm.get('selectedPricingOption').patchValue( this.selectedPricingOption);
        this.spaceForm.get('typeId').patchValue( this.selectedSpaceType);
        let spaceToUpdate = {
          ...this.spaceForm.value,
          userId: this.currentUser['id']
        }
        delete spaceToUpdate.amenities;
        //console.log(spaceToUpdate);
        
        
        this.store.dispatch(new spaceActions.UpdateSpace(spaceToUpdate));
      }
      else {
        this.spaceForm.get('selectedPricingOption').patchValue( this.selectedPricingOption);
        this.spaceForm.get('typeId').patchValue( this.selectedSpaceType);
        const spaceToCreate = {
          ...this.spaceForm.value,
          user: {
            id: this.currentUser['id']
          }
        }
        //console.log(this.spaceForm.value);
        
        this.store.dispatch(new spaceActions.CreateSpace((spaceToCreate)));
      }
      // this.spaceForm.reset();
      // this.selectedPricingOption = null;
      // this.selectedSpaceType = null;
    }



}
