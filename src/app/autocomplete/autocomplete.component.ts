import { Component, ViewChild,
        EventEmitter, Output, 
        OnInit, AfterViewInit,
        Input, ElementRef } from '@angular/core';
// import { } from 'googlemaps';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements OnInit, AfterViewInit {

  @Input() adressType: string;
  @Input() locationName: string;
  @Input() long: string;
  @Input() lat: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Output() setLocationDetails: EventEmitter<any> = new EventEmitter();
  @ViewChild('addressText', {static: false}) addressText: ElementRef;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        // const autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement,
        //     {
        //         componentRestrictions: { country: 'NG' },
        //         types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
        //     });
        // google.maps.event.addListener(autocomplete, 'place_changed', () => {
        //     const place = autocomplete.getPlace();
        //     const lat = place.geometry.location.lat();  
        //     const locationName = place.name + place.formatted_address;         
        //     const long = place.geometry.location.lng();
        //     this.invokeLocationEvent({ locationName, lat, long });           
        //     this.invokeEvent(place);
        // });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

    invokeLocationEvent(locationDetails: Object) {
        this.setLocationDetails.emit(locationDetails)
    }

}