import {AuthService} from './../services/auth.service';
import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {take, tap, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      console.log('authguard', true);
      return true;
    }
    return this.authService.getFirebaseAuthObservable().pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn: boolean) => {
        console.log('obs', loggedIn);
        if (!loggedIn) {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
