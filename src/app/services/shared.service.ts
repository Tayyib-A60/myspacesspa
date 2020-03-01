import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SharedService {



    constructor(private httpClient: HttpClient) { }

    postEnquiry(message) {
        const url = environment.url;
        return this.httpClient.post(`${url}/spaceEnquiry`, message);
    }
}