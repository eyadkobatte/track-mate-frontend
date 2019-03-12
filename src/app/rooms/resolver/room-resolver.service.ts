import {User} from './../../home/auth/user';
import {AuthService} from './../../home/auth/services/auth.service';
import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Observable, EMPTY} from 'rxjs';
import {RoomService} from '../services/room.service';
import {Room} from '../room';
import {take, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomResolverService implements Resolve<any> {
  user: User;

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.authService.userLoggedIn.subscribe((user: User) => {
      if (user) {
        this.user = user;
      }
    });
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    let uid = route.paramMap.get('uid');
    return this.roomService.getRoomsForUser(uid);
  }
}
