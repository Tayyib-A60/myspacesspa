import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CommonModule, JsonPipe } from "@angular/common";
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { NguCarouselModule } from '@ngu/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpacesModule } from './spaces/spaces.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListYourSpaceComponent } from './list-your-space/list-your-space.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { BookingRequestTwoComponent } from './booking-request-two/booking-request-two.component';
import { SpaceDisplayComponent } from './space-display/space-display.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './state/user.module';
import { UserEffects } from './state/user.effects';
import { BookingModule } from './state/booking/booking.module';
import { BookingEffects } from './state/booking/booking.effects';
import { MapSpaceComponent } from './map-space/map-space.component';
import { SpaceChatComponent } from './space-chat/space-chat.component';
import { SpaceHomeComponent } from './space-home/space-home.component';
import { NewSpaceComponent } from './new-space/new-space.component';
import { ToastrModule } from 'ngx-toastr';
import { SampleCarouselComponent } from './sample-carousel/sample-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselModule} from 'primeng/carousel';
import { NavigationComponent } from './navigation/navigation.component';
import { NewNavComponent } from './new-nav/new-nav.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { SpacePaginationComponent } from './space-pagination/space-pagination.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return JSON.parse(sessionStorage.getItem("currentUser")).token;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListYourSpaceComponent,
    ProfileComponent,
    BookingRequestComponent,
    BookingRequestTwoComponent,
    SpaceDisplayComponent,
    MapSpaceComponent,
    SpaceChatComponent,
    SpaceHomeComponent,
    NewSpaceComponent,
    SampleCarouselComponent,
    NavigationComponent,
    FooterComponent,
    NewNavComponent,
    SpacePaginationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    NguCarouselModule,
    RouterModule,
    NgSelectModule,
    HttpClientModule,
    CarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqDa-Jf1KhEOO0FXyJwReGiquRMCaz9Bs'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    SpacesModule,
    UserModule,
    SharedModule,
    BookingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([UserEffects, BookingEffects]),
    StoreDevtoolsModule.instrument({
      name: '234 Spaces',
      maxAge: 25,
      logOnly: environment.production
    }) // AIzaSyDqDa-Jf1KhEOO0FXyJwReGiquRMCaz9Bs (Google maps api key)
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
