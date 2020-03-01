import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { SpaceService } from '../spaces/space.service';
import { Store } from '@ngrx/store';
import * as spaceReducer from '../spaces/state/space.reducers';
import * as spaceActions from '../spaces/state/space.actions';

@Component({
  selector: 'app-space-home',
  templateUrl: './space-home.component.html',
  styleUrls: ['./space-home.component.scss']
})
export class SpaceHomeComponent implements OnInit {

  spaceTypes: any[];
  selectedType: any;
  searchString: string;
  query = {
    currentPage: 1,
    pageSize: 10,
    spaceType: null,
    searchString: null,
    size: null,
    price: null
  };
  constructor(private spaceService: SpaceService,
    private store: Store<spaceReducer.SpaceState>) { }

  ngOnInit() {
    this.spaceService.getSpaceTypes().subscribe((spaceTypes: any[]) => {
      // //console.log(spaceTypes);
      this.spaceTypes = spaceTypes;
    })
  }

  search() {
    this.query.searchString = this.searchString;
    this.query.spaceType = this.selectedType? this.selectedType.id : null;
    this.store.dispatch(new spaceActions.GetSpaces(this.query));
  }

}
