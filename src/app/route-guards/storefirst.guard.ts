// import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate
} from '@angular/router';

import { Observable, from } from 'rxjs';
import { StoreComponent } from '../components/store/store.component';

@Injectable()
export class StoreFirstGuard implements CanActivate {
  private firstActivation = true;

  constructor(
    private router: Router,
    // private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.firstActivation) {
      this.firstActivation = false;
      if (route.component !== StoreComponent) {
        this.router.navigateByUrl('/store');
        return from([false]);
      }
    }
    // else if (state.url.indexOf('/admin') === 0
    //   && this.authService.currentUserValue != null
    //   && this.authService.currentUserValue.success) {
    //     this.router.navigateByUrl('/admin/main');
    //     return from([false]);
    // }
    return from([true]);
  }
}
