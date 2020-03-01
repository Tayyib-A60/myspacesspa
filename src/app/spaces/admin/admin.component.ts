import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'CLIENT';
  hideSidebar: boolean;
  bgColor = "black";
  bgImage = "assets/img/sidebar-bg/01.jpg";
  iscollapsed = false;
  isSidebar_sm = false;
  isSidebar_lg = false;
  constructor() { }

  ngOnInit() {
  }

}
