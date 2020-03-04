import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../state/user.service';
import { Store } from '@ngrx/store';
import * as userReducer from '../state/user.reducers';
import * as userActions from '../state/user.actions';
import * as userSelectors from '../state/user.selector';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../services/notification.service';

const jwthelper = new JwtHelperService();
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup
  forgotPasswordPage = false;
  resetPasswordPage = false;
  confirmEmail = false;
  payload: any;
  expired: boolean;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private store: Store<userReducer.UserState>,
              private router: Router,
              private notification: NotificationService) { }

  ngOnInit() {
    this.forgotPasswordPage = this.route.snapshot.routeConfig.path === 'forgot-password'? true: false;
    this.resetPasswordPage = this.route.snapshot.routeConfig.path === 'reset-password'? true: false;
    this.confirmEmail = this.route.snapshot.routeConfig.path === 'confirm-email'? true: false;
    this.initializeForm();
  }

  private initializeForm() {
    this.route.queryParams.subscribe(res => {
      sessionStorage.setItem('token', res['token']);
      const token = res['token'];
      this.payload = jwthelper.decodeToken(token);
      this.expired = jwthelper.isTokenExpired(token);
        
      if(this.resetPasswordPage || this.confirmEmail) {
          if(this.expired) {
            this.notification.typeInfo('Your token has expired, please reset your password', 'Token Expired');
            this.router.navigate(['../'], {relativeTo: this.route});
          }
      }
    });
    if(this.forgotPasswordPage) {
      this.form = this.formBuilder.group({
        email:['', [Validators.required, Validators.email]],
      });
    } 
    if(!this.expired) {
      if(this.resetPasswordPage) {
            this.form = this.formBuilder.group({
              name: [this.payload['unique_name'], Validators.required],
              email:[this.payload['nameid'], [Validators.required, Validators.email]],
              password:['', [Validators.required, Validators.minLength(8)]]
            });
        } else if(this.confirmEmail) {
            const user = {
              email: this.payload['nameid'],
              id: this.payload['groupsid'],
              role: this.payload['role']
            }
            console.log(this.payload);
            
            this.store.dispatch(new userActions.ConfirmEmail(user));
        }
    }
  }

  submit() {
    if(this.route.snapshot.routeConfig.path === 'forgot-password') {
      this.userService.getUserByEmail(this.form.value['email']).subscribe(
        user => {
          this.store.dispatch(new userActions.ForgotPassword(user));
        }, err => {
        }
      ); 
    } else if(this.route.snapshot.routeConfig.path === 'reset-password') {
          const userToUpdate = {...this.form.value, id: this.payload['groupsid'], role: this.payload['role']}
          this.store.dispatch(new userActions.ResetPassword(userToUpdate));
    } else if(this.route.snapshot.routeConfig.path === 'confirm-email') {
          const user = {
            email: this.payload['nameid'],
            id: this.payload['groupsid'],
            role: this.payload['role']
          }
          this.store.dispatch(new userActions.ConfirmEmail(user));
    }
  }

}
