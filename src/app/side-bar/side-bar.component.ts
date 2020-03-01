import { Component, OnInit, ViewChild, OnDestroy, ElementRef, Renderer2 } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { customAnimations } from '../helpers/animations/custom.animation';

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  animations: customAnimations
})
export class SideBarComponent implements OnInit, OnDestroy {

  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  layoutSub: Subscription;
  currentUser: any;
  isSuperAdmin = false;

  @ViewChild('toggleIcon', {static: false}) toggleIcon: ElementRef;
  public menuItems =  [{
    path: '', title: 'Add Space', route: '/admin/add-space', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  },
  // {
  //   path: '', title: 'Add ons', route: '/admin/create-addons', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  // }
  {
    path: '', title: 'Manage Space', route: '/admin/manage-space', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  }, {
    path: '', title: 'Manage Reservations', route: '/admin/manage-reservations', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  }, 
  // {
  //   path: '', title: 'View Enquiries', route: '/admin/manage-enquiries', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  // },
  {
    path: '', title: 'Manage Bookings', route: '/admin/manage-bookings', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  },
  {
    path: '', title: 'Analytics', route: '/admin/analytics', icon: 'ft-home', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
  }
];


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private layoutService: LayoutService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }

    this.layoutSub = layoutService.customizerChangeEmitted$.subscribe(
      options => {
        if (options) {
          if (options.bgColor) {
            if (options.bgColor === 'white') {
              this.logoUrl = 'assets/img/logo-dark.png';
            }
            else {
              this.logoUrl = 'assets/img/logo.png';
            }
          }

          if (options.compactMenu === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          }
          else if (options.compactMenu === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }

        }
      });

  }


  ngOnInit() {
    this.config = this.configService.templateConf;
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    //console.log(this.currentUser);
    if(this.currentUser['roles'] === 'AnySpaces'){
      this.isSuperAdmin = true;
    }
    // this.menuItems = [
    //     {
    //       path: '', title: 'Add Space', icon: 'ft-home', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false
    //     } 
    // ];

    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }


  }


  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1)
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
  }
}
