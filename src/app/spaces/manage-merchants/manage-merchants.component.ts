import { takeWhile } from 'rxjs/operators';
import { QueryResult } from './../models/queryResult.model';
import { Component, OnInit } from '@angular/core';
import { SpaceState } from '../state/space.reducers';
import { Store, select } from '@ngrx/store';
import * as spaceActions from './../state/space.actions';
import * as spaceSelector from './../state/space.selector';

@Component({
  selector: 'app-manage-merchants',
  templateUrl: './manage-merchants.component.html',
  styleUrls: ['./manage-merchants.component.scss']
})
export class ManageMerchantsComponent implements OnInit {

  merchants: any[];
  componentActive = true;
  constructor(private spaceStore: Store<SpaceState>) { }

  ngOnInit() {
    this.spaceStore.dispatch(new spaceActions.GetMerchants());
    this.spaceStore.pipe(select(spaceSelector.getMerchantsQueryResult),
                        takeWhile(() => this.componentActive))
                        .subscribe(merchants => {
                          //console.log(merchants);
                          
                          this.merchants = merchants['items']
                        });
  }

}
