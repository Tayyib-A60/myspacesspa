import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthGuardService implements CanActivate{

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = sessionStorage.getItem('currentUser');
      if(JSON.parse(currentUser)['roles'] === 'AnySpaces') {
          return true;
      }
      this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  
    isAuthenticated(): boolean {
      return sessionStorage.getItem('currentUser') ? true : false;
    }
}
