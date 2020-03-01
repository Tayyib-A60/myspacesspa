import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageMerchantsService {
  url = environment.url;
  constructor(private httpClient: HttpClient) { }

  getMerchants(filter?: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.url + '/lineUp/getMerchants';
    return this.httpClient.get(url, { headers });
  }
  
}
