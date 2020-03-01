import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer } from './booking.reducer';
import { BookingEffects } from './booking.effects';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('booking', reducer),
    EffectsModule.forFeature([BookingEffects])
  ]
})
export class BookingModule { }
