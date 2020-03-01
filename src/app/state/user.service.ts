import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserToSignIn } from '../spaces/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    url = environment.url;
    constructor(private httpClient: HttpClient) { }

    createUserAsCustomer(user: User) {
        //console.log('User service clicked');
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + '/lineUp/user/createCustomer';
        return this.httpClient.post(url, user, { headers });
    }
    createUserAsMerchant(user: User) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + '/lineUp/user/createMerchant';
        return this.httpClient.post(url, user, { headers });
    }
    createUserAsSuperAdmin(user: User) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + '/lineUp/user/createSuperAdmin';
        return this.httpClient.post(url, user, { headers });
    }
    
    signInUser(user: UserToSignIn) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + '/lineUp/user/authenticate';
        return this.httpClient.post(url, user, { headers });
    }

    getUserByEmail(email: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + `/lineUp/user/${email}`;
        return this.httpClient.get(url, { headers });
    }

    forgotPassword(user: UserToSignIn) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + '/lineUp/user/forgotPassword';
        return this.httpClient.post(url, user, { headers });
    }

    resetPassword(user: object) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + `/lineUp/user/${user['id']}`;
        return this.httpClient.put(url, user, { headers });
    }
    
    confirmEmail(user: object) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.url + `/lineUp/user/verifyAccount`;
        return this.httpClient.put(url, user, { headers });
    }

    confirmAsMerchant(user: object) {
        const headers = new HttpHeaders({'Content-Type': 'application/json' });
        const url = `${this.url}/lineUp/user/verifyAsMerchant`;
        return this.httpClient.put(url, user, { headers });
    }

    getUserDetails(userId: number) {
        const headers = new HttpHeaders({'Content-Type': 'application/json' });
        const url = `${this.url}/lineUp/getUser/${userId}`;
        return this.httpClient.get(url, { headers });
    }
}