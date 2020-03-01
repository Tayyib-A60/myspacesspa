import { AuthGuardService } from './../services/authguard.service';
import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { MerchantAuthGuardService } from '../services/merchantAuthGuardService';
import { Router, ActivatedRoute } from '@angular/router';
import * as userReducer from '../state/user.reducers';
import * as userActions from '../state/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  name = '234Spaces   |';
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  layoutSub: Subscription;
  currentUser: any;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(private layoutService: LayoutService,
              private configService:ConfigService,
              private authGuard: AuthGuardService,
              private merchantAuthGuard: MerchantAuthGuardService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<userReducer.UserState>) {

      this.layoutSub = layoutService.changeEmitted$.subscribe(
        direction => {
          const dir = direction.direction;
          if (dir === "rtl") {
            this.placement = "bottom-left";
          } else if (dir === "ltr") {
            this.placement = "bottom-right";
          }
        });
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  merchantIsAuthenticated() {
    if(this.currentUser) {      
      return this.currentUser['roles'] === 'Merchant' || this.currentUser['roles'] === 'AnySpaces'? true: false;
    }    
  }

  signOut() {
    sessionStorage.removeItem('currentUser');
    this.store.dispatch(new userActions.SignOutUser());
    this.router.navigate(['']);
  }

  anyUserIsAuthenticated() {
    return sessionStorage.getItem('currentUser')? true: false;
  }

  ngAfterViewInit() {
    if(this.config.layout.dir) {
      setTimeout(() => {
        const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ChangeLanguage(language: string) {
    // this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    // this.layoutService.emitNotiSidebarChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
}
