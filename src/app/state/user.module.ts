import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { reducer } from './user.reducers';
import { UserEffects } from './user.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
 
@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ResetPasswordComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: []
})
export class UserModule { }
