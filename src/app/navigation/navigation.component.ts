import { Component, OnInit } from '@angular/core';

import { MerchantAuthGuardService } from '../services/merchantAuthGuardService';
import { Router } from '@angular/router';
import * as userReducer from '../state/user.reducers';
import * as userActions from '../state/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUser: any;

  constructor(private store: Store<userReducer.UserState>,
              private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  merchantIsAuthenticated() {
    if(this.currentUser) {      
      return this.currentUser['roles'] === 'Merchant' || 'AnySpaces'? true: false;
    }    
  }

  signOut() {
    sessionStorage.removeItem('currentUser');
    this.store.dispatch(new userActions.SignOutUser());
    this.router.navigate(['']);
  }

  anyUserIsAuthenticated() {
    return sessionStorage.getItem('currentUser')? true: false;
  }

}
