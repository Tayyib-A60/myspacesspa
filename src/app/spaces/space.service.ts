import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpaceType } from './models/spaceType.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Amenity } from './models/amenity.model';
import { Space } from './models/space.model';

@Injectable({
  providedIn: 'root'
})

export class SpaceService {
  url = environment.url;
  id = JSON.parse(sessionStorage.getItem('currentUser'))? JSON.parse(sessionStorage.getItem('currentUser')).id : null;
  constructor(private httpClient: HttpClient) {
    this.id = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).id : null;
  }

  createSpace(space: Space) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + `/lineUp/createSpace/${this.id}`;
    return this.httpClient.post(url, space, { headers });
  }
  
  getSpace(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/lineUp/getSpace/${id}`;
    return this.httpClient.get(url, { headers });
  }

  getMerchantMetrics(merchantId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/lineUp/getMetrics/${merchantId}`;
    return this.httpClient.get(url, { headers });
  }
  
  updateSpace(id: number, space: Space) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/lineUp/updateSpace/${id}`;
    return this.httpClient.put(url, space, { headers });
  }

  createSpaceType(spaceType: SpaceType) {
    //console.log('Got to create space type');
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/createSpaceType/' + this.id;
    return this.httpClient.post(url, spaceType, { headers });
  }

  createAmenity(amenity: Amenity) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/createAmenity';
    return this.httpClient.post(url, amenity, { headers });
  }

  createPricingOption(pricingOption: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/createPricingOption';
    return this.httpClient.post(url, pricingOption, { headers });
  }
  createAmenities(amenities: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + `/lineUp/createAmenities/${this.id}`;
    return this.httpClient.post(url, amenities, { headers });
  }

  getSpaceTypes() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/getSpaceTypes';
    return this.httpClient.get(url, { headers });
  }

  getpricingOptions() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/getPricingOptions';
    return this.httpClient.get(url, { headers });
  }
  
  getSpaces(filter?: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/getSpaces?' + this.toQueryString(filter);
    return this.httpClient.get(url, { headers });
  }
  getMerchantSpaces(filter?: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/getMerchantSpaces?' + this.toQueryString(filter);
    return this.httpClient.get(url, { headers });
  }

  deleteSpace(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/deleteSpace/' + id;
    return this.httpClient.delete(url, { headers });
  }
  
  deletePhoto(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/photos/' + id;
    return this.httpClient.delete(url, { headers });
  }

  setMainPhoto(ids): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/photos/setMain';
    return this.httpClient.post(url, ids, { headers });
  }

  getMerchants(filter?: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/getMerchants';
    return this.httpClient.get(url, { headers });
  }

  private toQueryString(obj) {
    const parts = [];
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
