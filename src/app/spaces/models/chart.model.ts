import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
  }