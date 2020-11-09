import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../@auth/core/auth.service';
import { HOME } from '../../app.conf';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  authenticatedObservable$: Observable<boolean>;
  authenticatedFlag: Boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authenticatedObservable$ = this.authService.isAuthenticated();
    this.authenticatedObservable$.subscribe(flag => this.authenticatedFlag = flag)
  }

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.user != 'null' && this.authService.user != null) {
      console.log(`user in localStorage is ${this.authService.user}`);
      return true;
    }

    this.router.navigate(['auth/login'], {
      queryParams: {
        returnUrl: state?.url || HOME,
      },
    });
    return false;
  }
}
