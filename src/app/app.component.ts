import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const jwthelper = new JwtHelperService();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  payload: any;
  expired: boolean;
  constructor(private router: Router) {

  }
  ngOnInit() {
      const token = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).token : null;
      this.payload = jwthelper.decodeToken(token);
      this.expired = jwthelper.isTokenExpired(token);

      if(this.expired) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
  }
  
}
