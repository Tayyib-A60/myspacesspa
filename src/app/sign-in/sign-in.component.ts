import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as userReducer from '../state/user.reducers';
import * as userActions from '../state/user.actions';
import * as userSelectors from '../state/user.selector';
import { takeWhile } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  componentActive = true;

  constructor(private formBuilder: FormBuilder,
              private store: Store<userReducer.UserState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();  
  }

  private initializeForm() {
    this.signInForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signIn() {
    this.store.dispatch(new userActions.SignInUser(this.signInForm.value));
    this.signInForm.reset();
    // this.store.pipe(select(userSelectors.getCurrentUser),
    // takeWhile(() => this.componentActive))
    // .subscribe(currentUser => {
    //   if(currentUser)
    //     this.router.navigate(['../'], {relativeTo: this.route});
    // });  
  }

}
