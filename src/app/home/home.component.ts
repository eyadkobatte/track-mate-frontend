import {User} from './auth/user';
import {AuthService} from './auth/services/auth.service';
import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User = null;
  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((loggedInUser: User) => {
      this.ngZone.run(() => {
        if (loggedInUser) {
          this.user = loggedInUser;
          this.router.navigate([`/u/${this.user.uid}`]);
        } else {
          this.user = null;
        }
      });
    });
  }
}
