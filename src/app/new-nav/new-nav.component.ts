import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as userReducer from '../state/user.reducers';
import * as userActions from '../state/user.actions';
import { SpaceService } from '../spaces/space.service';

@Component({
  selector: 'app-new-nav',
  templateUrl: './new-nav.component.html',
  styleUrls: ['./new-nav.component.scss']
})

export class NewNavComponent implements OnInit {
  currentUser: any;
  spaceTypes: any[];
  loaded: boolean;
  selectedType: any;

  constructor(private store: Store<userReducer.UserState>,
    private router: Router, private spaceService: SpaceService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.spaceService.getSpaceTypes().subscribe((spaceTypes: any[]) => {
      //console.log(spaceTypes);
      this.spaceTypes = spaceTypes; 
    })
  }

  merchantIsAuthenticated() {
    if(this.currentUser) {      
      return this.currentUser['roles'] === 'Merchant' || 'AnySpaces'? true: false;
    }    
  }

  signOut() {
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
    this.store.dispatch(new userActions.SignOutUser());
    this.router.navigate(['']);
  }

  anyUserIsAuthenticated() {
    return sessionStorage.getItem('currentUser')? true: false;
  }

}
