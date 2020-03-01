import { ManagespacesComponent } from './../spaces/managespaces/managespaces.component';
import { MapSpaceComponent } from './../map-space/map-space.component';
import { PaginationComponent } from './../pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { NewNavComponent } from '../new-nav/new-nav.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    PaginationComponent,
    // MapSpaceComponent,
    ManagespacesComponent,
    NavbarComponent,
    // FooterComponent,
    // NewNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqDa-Jf1KhEOO0FXyJwReGiquRMCaz9Bs'
    }),
  ]
})
export class SharedModule { }
