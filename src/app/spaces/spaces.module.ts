import { PaginationComponent } from './../pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagInputModule } from 'ngx-chips';
import { ChartistModule } from 'ng-chartist';

import { AddspaceComponent } from './addspace/addspace.component';
import { AdminComponent } from './admin/admin.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SidebarDirective } from '../shared/directives/sidebar.directive';
import { SidebarLinkDirective } from '../shared/directives/sidebarlink.directive';
import { SidebarListDirective } from '../shared/directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from '../shared/directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from '../shared/directives/sidebartoggle.directive';
import { AppRoutingModule } from '../app-routing.module';
import { ManagespacesComponent } from './managespaces/managespaces.component';
import { ManagereservationsComponent } from './managereservations/managereservations.component';
import { ManagebookingsComponent } from './managebookings/managebookings.component';
import { ManageenquiriesComponent } from './manageenquiries/manageenquiries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SpaceEffects } from './state/space.effects';
import { reducer } from './state/space.reducers';
import { AddPropsComponent } from './add-props/add-props.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ManageMerchantsComponent } from './manage-merchants/manage-merchants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NguCarouselModule } from '@ngu/carousel';
import { AdminPaginationComponent } from './admin-pagination/admin-pagination.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ManageAvailabilityComponent } from './manage-availability/manage-availability.component';
import { RouterModule } from '@angular/router';
import { BookForClientComponent } from './book-for-client/book-for-client.component';

@NgModule({
  declarations: [
    AddspaceComponent,
    AdminComponent,
    SideBarComponent,
    SidebarDirective,
    SidebarLinkDirective,
    SidebarListDirective,
    SidebarAnchorToggleDirective,
    SidebarToggleDirective,
    // ManagespacesComponent,
    ManagereservationsComponent,
    ManagebookingsComponent,
    ManageenquiriesComponent,
    AddPropsComponent,
    ManageMerchantsComponent,
    DashboardComponent,
    ImageEditorComponent,
    AdminPaginationComponent,
    AutocompleteComponent,
    ManageAvailabilityComponent,
    BookForClientComponent,
    // PaginationComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    TagInputModule,
    FormsModule,
    FileUploadModule,
    NgSelectModule,
    RouterModule,
    NguCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqDa-Jf1KhEOO0FXyJwReGiquRMCaz9Bs'
    }),
    ReactiveFormsModule,
    StoreModule.forFeature('spaces', reducer),
    EffectsModule.forFeature([SpaceEffects]),
    NgSelectModule,
    ChartistModule
  ],
  providers: [SidebarDirective]
})
export class SpacesModule { }
