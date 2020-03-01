import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable/release'

import * as spaceActions from './../state/space.actions';
import * as spaceReducer from './../state/space.reducers';
import * as spaceSelectors from './../state/space.selector';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { SpaceQueryResult } from '../models/spaceQueryResult';

@Component({
  selector: 'app-managespaces',
  templateUrl: './managespaces.component.html',
  styleUrls: ['./managespaces.component.scss']
})
export class ManagespacesComponent implements OnInit {

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  
  spaceQueryResult = <SpaceQueryResult>{items: [], totalItems: 0} ;
  componentActive = true;
  currentPage: number;
  spaces = [];
  loaded: boolean;
  merchantId = sessionStorage.getItem('currentUser')? 
  JSON.parse(sessionStorage.getItem('currentUser'))['id'] : 0;
  merchantQuery = {
    userId: this.merchantId,
    currentPage: this.currentPage,
    pageSize: null
  };
  
    constructor(private store: Store<spaceReducer.SpaceState>,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.merchantQuery = { userId: this.merchantId, currentPage: 1, pageSize: 3 };
        this.store.dispatch(new spaceActions.GetMerchantSpaces(this.merchantQuery));
      });

      this.store.pipe(select(spaceSelectors.getMerchantSpaces),
      takeWhile(() => this.componentActive))
      .subscribe(spaceQR => {
        this.spaceQueryResult = spaceQR;
        this.spaces = spaceQR['items'];
      });
    }

    deleteSpace(id: number) {
      if (confirm('Confirm Delete?')) {
        this.store.dispatch(new spaceActions.DeleteSpace(id));
      }
    }

    onPageChange(page: number) {
      this.merchantQuery = { ...this.merchantQuery, currentPage: page };
      this.store.dispatch(new spaceActions.GetMerchantSpaces(this.merchantQuery));
  
      this.store.pipe(select(spaceSelectors.getMerchantSpaces),
      takeWhile(() => this.componentActive))
      .subscribe(spaceQR => {
        this.spaceQueryResult = spaceQR
      });
    }

}
