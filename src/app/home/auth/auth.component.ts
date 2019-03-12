import {User} from './user';
import {AuthService} from './services/auth.service';
import {Component, OnInit, NgZone} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private ngZone: NgZone) {}

  ngOnInit() {}

  signInWithGoogle() {
    this.ngZone.run(() => {
      this.authService.signInWithGoogle().then((res) => {
        this.handleUserLogin(res);
      });
    });
  }

  signInWithFacebook() {
    this.ngZone.run(() => {
      this.authService.signInWithFacebook().then((res) => {
        this.handleUserLogin(res);
      });
    });
  }

  signInWithTwitter() {
    this.ngZone.run(() => {
      this.authService.signInWithTwitter().then((res) => {
        this.handleUserLogin(res);
      });
    });
  }

  handleUserLogin = (res: firebase.auth.UserCredential) => {
    // If a new user is created. add him to database and then use sendOutUserDetails to send out the user details.
    // But if an old user is logging in dont sendOutUserDetails. Auth Service will take care of it.
    if (res.additionalUserInfo.isNewUser) {
      this.authService.createNewUser(res).subscribe((user: User) => {
        this.authService.sendOutUserDetails(user);
      });
    }
  };
}
