import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as userReducer from '../state/user.reducers';
import * as userActions from '../state/user.actions';
import * as userSelectors from '../state/user.selector';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: any;
  showEmailResend = false;
  componentActive = true;
  error: any;
  response: any;

  constructor(private formBuilder: FormBuilder,
              private store: Store<userReducer.UserState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();    
  }
  private initializeForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signUp() {
    if(this.route.snapshot.routeConfig.path === 'sign-up') {
      this.store.dispatch(new userActions.CreateUser(this.signUpForm.value));
    } else if(this.route.snapshot.routeConfig.path === 'sign-up-as-merchant') {
      this.store.dispatch(new userActions.CreateMerchantUser(this.signUpForm.value));
    }
    this.store.pipe(select(userSelectors.getError),
    takeWhile(() => this.componentActive))
    .subscribe(error => {
      if(error === null) this.signUpForm.reset();
    });
    // this.store.pipe(select(userSelectors.getResponse),
    // takeWhile(() => this.componentActive))
    // .subscribe(response => {
    //   //console.log(response);
    //   this.response = response
    // });
  }

}
