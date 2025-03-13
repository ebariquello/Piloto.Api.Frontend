import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { TestSuite } from 'test-suite';
import { UserService } from 'app/core/services/login/user.service';
import { LoginModel } from 'app/shared/models/login.model';

describe('JwtInterceptor', () => {
  let routerMock: Mock<Router>;
  let userServiceMock: Mock<UserService>;
  let httpMock: HttpTestingController;
  TestSuite.configure();

  beforeEach(() => {
    routerMock = MockFactory.create(Router);
    userServiceMock = MockFactory.create(UserService);

    TestSuite.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useFactory: () => routerMock },
        { provide: UserService, useFactory: () => userServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });
    localStorage.clear();
    userServiceMock = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should not inject auth header, if user not authorized', inject(
    [HttpClient],
    (httpClient: HttpClient) => {
      httpClient
        .get('/any-path')
        .subscribe((response) => expect(response).toBeTruthy());
      const httpRequest = httpMock.expectOne(`/any-path`);
      expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
      httpRequest.flush({ data: 'test' });
    }
  ));

  it('should inject auth header, if user authorized', inject(
    [HttpClient],
    (httpClient: HttpClient) => {
      const currentUser: LoginModel = {
        success: true,
        token: 'meu token de teste',
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      userServiceMock._spy.currentLoginValue._get.and.returnValue(currentUser);

      httpClient
        .get('/any-path')
        .subscribe((response) => expect(response).toBeTruthy());

      const httpRequest = httpMock.expectOne(`/any-path`);

      expect(userServiceMock.currentLoginValue).not.toBeNull();

      expect(userServiceMock.currentLoginValue).toEqual(currentUser);

      httpRequest.flush({ data: 'test' });

      expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    }
  ));
});
