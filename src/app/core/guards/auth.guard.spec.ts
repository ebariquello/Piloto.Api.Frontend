import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { TestSuite } from 'test-suite';
import { of } from 'rxjs/internal/observable/of';
import { UserService } from 'app/core/services/login/user.service';

describe('Auth Guard', () => {
  let routerServiceMock: Mock<Router>;
  let userServiceMock: Mock<UserService>;
  let guard: AuthGuard;
  let route: Mock<ActivatedRouteSnapshot>;
  let state: Mock<RouterStateSnapshot>;
  TestSuite.configure();

  beforeEach(() => {
    routerServiceMock = MockFactory.create(Router);
    route = MockFactory.create(ActivatedRouteSnapshot);
    state = MockFactory.create(RouterStateSnapshot);
    userServiceMock = MockFactory.create(UserService);

    TestSuite.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: UserService, useFactory: () => userServiceMock },
        { provide: Router, useFactory: () => routerServiceMock },
        { provide: RouterStateSnapshot, useFactory: () => state },
        { provide: ActivatedRouteSnapshot, useFactory: () => route },
      ],
    });
    userServiceMock = TestBed.get(UserService);
    guard = TestBed.get(AuthGuard);
  });

  it('should return true if currentLoginValue of userService equal true', (done) => {
    userServiceMock._spy.currentUser._get.and.returnValue(
      of({
        token: 'meu token de teste',
      })
    );
    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should return false if currentLoginValue of userService isn`t true', (done) => {
    userServiceMock._spy.currentUser._get.and.returnValue(of(null));
    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toEqual(false);
      expect(routerServiceMock.navigateByUrl).toHaveBeenCalledWith('/login');
      done();
    });
  });
});
