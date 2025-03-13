import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from 'app/core/services/login/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.currentUser.pipe(
      map((user) => {
        if (!user) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      }));
  }
}
