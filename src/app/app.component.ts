import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from './services/notification.service';

const jwthelper = new JwtHelperService();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  payload: any;
  expired: boolean;
  constructor(private router: Router,
              private notification: NotificationService) {

  }
  ngOnInit() {
    
      const token = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).token : sessionStorage.getItem('token')? sessionStorage.getItem('token') : null;
      console.log(token.toString());
      
      this.payload = jwthelper.decodeToken(token.toString());
      this.expired = jwthelper.isTokenExpired(token.toString());

      if(this.expired) {
        this.notification.typeInfo('Your session has ended, please login to continue', 'Session expired');  
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);
      }
  }
  
}
