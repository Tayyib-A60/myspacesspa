import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import * as spaceReducer from '../spaces/state/space.reducers';
import * as spaceActions from '../spaces/state/space.actions';
import * as spaceSelectors from '../spaces/state/space.selector';
import { takeWhile } from 'rxjs/operators';
import { SpaceQueryResult } from '../spaces/models/spaceQueryResult';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hideSidebar: boolean;
  firstRating: any;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
  selectedCity: any;
  spaceQueryResult: SpaceQueryResult;
  componentActive = true;
  constructor(private carouselConfig: NgbCarouselConfig,
              private store: Store<spaceReducer.SpaceState>,
              private notification: NotificationService) 
  {
      carouselConfig.showNavigationArrows = false;
      carouselConfig.interval = 4000;
  }
  
  ngOnInit() {
    // this.store.dispatch(new spaceActions.GetSpaces());

    this.store.pipe(select(spaceSelectors.getSpaceQueryResult),
    takeWhile(() => this.componentActive))
    .subscribe(spaceQR => {
      this.spaceQueryResult = spaceQR
    });
  }

  toggleHideSidebar($event: boolean): void {
    setTimeout(() => {
      this.hideSidebar = $event;
    }, 0);
  }
  
}
