import { Component, OnInit } from '@angular/core';

import * as spaceActions from './../state/space.actions';
import * as spaceReducer from './../state/space.reducers';
import * as spaceSelectors from './../state/space.selector';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as Chartist from 'chartist';
import { Chart } from '../models/chart.model';

declare var require: any;
const data = require('../../shared/chartist.json');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  merchantId = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser'))['id'] : 0;
  componentActive = true;
  merchantMetrics: any;
  WidgetlineChart: Chart = {
    type: 'Line', data: data['WidgetlineChart'],
    options: {
        axisX: {
            showGrid: true,
            showLabel: false,
            offset: 0,
        },
        axisY: {
            showGrid: false,
            low: 40,
            showLabel: false,
            offset: 0,
        },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        fullWidth: true,
    },
};

  constructor(private store: Store<spaceReducer.SpaceState>) { }

  ngOnInit() {    
    this.store.dispatch(new spaceActions.GetMerchantMetrics(Number(this.merchantId)));
    this.store.pipe(select(spaceSelectors.getMerchantMetrics),
    takeWhile(() => this.componentActive))
    .subscribe(metrics => {
      //console.log(metrics);
      this.merchantMetrics = metrics
    });
  }


}
