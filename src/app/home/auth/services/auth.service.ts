import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, BehaviorSubject } from 'rxjs';

import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private firebaseUserDetails: firebase.User = null;

  private userSubscription: Subscription;

  userLoggedIn = new BehaviorSubject<User>(null);
  public currentlyLoggedInUser: User = null;

  allUsers: User[] = [];

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router) {
    // This will only work for repeating users because when we get users from database and if its a new users, there wont be any record for it.
    this.userSubscription = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.firebaseUserDetails = user;
        this.getUserFromDatabase(user.uid).subscribe((loggedInUsers: User[]) => {
          if (loggedInUsers.length > 0) {
            this.currentlyLoggedInUser = loggedInUsers[0];
            this.sendOutUserDetails(loggedInUsers[0]);
          }
        });
      } else {
        this.firebaseUserDetails = null;
        this.sendOutUserDetails(null);
      }
    });
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signInWithTwitter() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  sendOutUserDetails(user: User) {
    // Subscribed to in home component
    if (user) this.userLoggedIn.next(user);
    else this.userLoggedIn.next(null);
  }

  createNewUser(userCredential: firebase.auth.UserCredential) {
    return this.http.post<User>(`${environment.apiURL}/users`, {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      email: userCredential.user.email
    });
  }

  getUserFromDatabase(uid: string) {
    return this.http.post<User[]>(`${environment.apiURL}/users/list`, {
      usersToFind: [uid]
    });
  }

  getUsersFromDatabase(uids: string[]) {
    return this.http.post<User[]>(`${environment.apiURL}/users/list`, {
      usersToFind: uids
    });
  }

  isLoggedIn() {
    return this.firebaseUserDetails === null ? false : true;
  }

  logout() {
    this.afAuth.auth.signOut().then(res => {
      this.userLoggedIn.next(null);
      this.firebaseUserDetails = null;
      this.router.navigate(['/']);
    });
  }

  getFirebaseAuthObservable() {
    return this.afAuth.authState;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  storeUsers(uids: string[]) {
    uids.forEach(uid => {
      this.storeUser(uid)
        .then(user => console.log(user))
        .catch(error => console.error(error));
    });
    // console.log('store users called');
    // this.http
    //   .post<User[]>(`${environment.apiURL}/users/list`, {
    //     usersToFind: uids
    //   })
    //   .subscribe((users: User[]) => {
    //     console.log(`found users`, users);
    //     this.allUsers.push(...users);
    //   });
  }

  storeUser(uid: string) {
    if (this.allUsers.find(value => value.uid === uid)) {
      // User details already exists in our service
      const findUser = new Promise((resolve, reject) => {
        let user = this.allUsers.filter(findingUser => findingUser.uid === uid);
        resolve(user[0]);
      });
      return findUser;
    } else {
      // User details must be fetched from database
      const findUser = new Promise((resolve, reject) => {
        this.http
          .post<User>(`${environment.apiURL}/users/uid`, {
            uid: uid
          })
          .subscribe((user: User) => {
            resolve(user);
            this.allUsers.push(user);
          });
      });
      return findUser;
    }
  }

  getUser(uid: string) {
    const findUser = new Promise((resolve, reject) => {
      let flag = false;
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.allUsers[i].uid === uid) {
          flag = true;
          resolve(this.allUsers[i]);
        }
      }
      if (flag === false) {
        this.storeUser(uid)
          .then((user: User) => {
            resolve(user);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
    return findUser;
  }

  getUserFromEmailInDatabase(email: string) {
    const user = new Promise((resolve, reject) => {
      if (this.allUsers.find(user => user.email === email)) {
        resolve(this.allUsers.find(user => user.email === email));
      } else {
        this.http
          .post(`${environment.apiURL}/users/email`, {
            email: email
          })
          .subscribe(
            (user: User) => {
              this.allUsers.push(user);
              resolve(user);
            },
            error => {
              reject(error);
            }
          );
      }
    });
    return user;
  }

  getUserFromUIDInDatabase(uid: string) {
    const user = new Promise((resolve, reject) => {
      if (this.allUsers.find(user => user.uid === uid)) {
        resolve(this.allUsers.find(user => user.uid === uid));
      } else {
        this.http
          .post(`${environment.apiURL}/users/email`, {
            uid: uid
          })
          .subscribe(
            (user: User) => {
              this.allUsers.push(user);
              resolve(user);
            },
            error => {
              reject(error);
            }
          );
      }
    });
    return user;
  }
}
