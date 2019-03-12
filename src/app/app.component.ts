import {AuthService} from './home/auth/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {User} from './home/auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((loggedInUser: User) => {
      if (loggedInUser) {
        this.user = loggedInUser;
      } else {
        this.user = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
