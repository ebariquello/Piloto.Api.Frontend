import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';

import { UserService } from 'app/core/services/login/user.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentLogin = this.userService.currentLoginValue;
    if (currentLogin && currentLogin.token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${currentLogin.token}`,
        'Content-Type': 'application/json',
      });
      const clonedRequest = request.clone({ headers });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
