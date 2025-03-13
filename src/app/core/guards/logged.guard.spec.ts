import { LoggedGuard } from './logged.guard';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { TestSuite } from 'test-suite';
import { UserService } from 'app/core/services/login/user.service';
import { of } from 'rxjs/internal/observable/of';

describe('Logged Guard', () => {
  let routerServiceMock: Mock<Router>;
  let userServiceMock: Mock<UserService>;
  let guard: LoggedGuard;
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
        LoggedGuard,
        { provide: UserService, useFactory: () => userServiceMock },
        { provide: Router, useFactory: () => routerServiceMock },
        { provide: RouterStateSnapshot, useFactory: () => state },
        { provide: ActivatedRouteSnapshot, useFactory: () => route },
      ],
    });
    userServiceMock = TestBed.get(UserService);
    userServiceMock._spy.currentLogin._get.and.returnValue(of({}));
    guard = TestBed.get(LoggedGuard);
  });

  it('should return false for currentUser.success of userService equal true', (done) => {
    userServiceMock._spy.currentLogin._get.and.returnValue(
      of({
        success: true,
        token: 'meu token de teste',
      })
    );
    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toEqual(false);
      expect(routerServiceMock.navigateByUrl).toHaveBeenCalledWith('/workflow');
      done();
    });
  });
  it('should return true for currentUser.success of userService equal false', (done) => {
    userServiceMock._spy.currentUser._get.and.returnValue(
      of({
        Success: false,
      })
    );
    guard.canActivate(route, state).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });
});
