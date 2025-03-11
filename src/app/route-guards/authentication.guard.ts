import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.authService.currentUserValue == null ||
      this.authService.currentUserValue.success === false
    ) {
      this.route.navigateByUrl('/admin/auth');
      return false;
    }
    return true;
  }
}
