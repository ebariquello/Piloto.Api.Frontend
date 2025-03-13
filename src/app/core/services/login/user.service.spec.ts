import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { TestSuite } from 'test-suite';
import { UserService } from './user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginModel } from 'app/shared/models/login.model';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LoginModule } from 'app/modules/login/login.module';
import { LoginComponent } from 'app/modules/login/pages/login/login.component';

describe('UserService', () => {
  let userService: UserService;
  let httpClientMock: Mock<HttpClient>;
  let router: Router;
  let toastr: ToastrService;

  TestSuite.configure();

  beforeEach(async () => {
    httpClientMock = MockFactory.create(HttpClient);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoginModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent,
          },
        ]),
      ],
      providers: [
        UserService,
        ToastrService,
        { provide: HttpClient, useFactory: () => httpClientMock },
      ],
    });
    localStorage.clear();

    toastr = TestBed.get(ToastrService);
    router = TestBed.get(Router);
    userService = new UserService(httpClientMock, router, toastr);
  });

  //   // afterEach(() => {
  //   //   httpMock.verify();
  //   // });

  it('should create', () => {
    expect(UserService).toBeTruthy();
  });

  it('should get currentLoginValue with empty or null', () => {
    expect(userService.currentLoginValue).toBeNull();
  });

  it('should get currentLoginValue', () => {
    const currentUser: LoginModel = {
      token: 'meu token de teste',
      success: true,
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    userService = new UserService(httpClientMock, router, toastr);
    expect(userService.currentLoginValue).not.toBeNull();
    expect(userService.currentLoginValue).toEqual(currentUser);
  });

  it('should do login successfully', () => {
    httpClientMock._spy.post._func.and.returnValue(
      of({
        token: 'token de teste',
        success: true,
      })
    );
    userService
      .login('usuario01@userede.com.br', 'Mudar@123')
      .subscribe((response) => {
        expect(response).toEqual({
          token: 'token de teste',
          success: true,
        });
        expect(userService.currentLoginValue).not.toBeNull();
        expect(localStorage.getItem('currentUser')).not.toBeNull();
      });
  });

  it('should not login successfully', () => {
    httpClientMock._spy.post._func.and.returnValue(
      of(throwError({ status: 404 }))
    );
    userService.login('usuario01@userede.com.br', 'Mudar@123').subscribe(
      (response) => {},
      (error) => {
        expect(error.status).toEqual(404);
      }
    );
  });

  it('should do logout successfully', () => {
    userService.logout();
    expect(userService.currentLoginValue).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  // TODO: Adicionar esse teste
  // it('should get user information', () => {
  //   const expectedResponse: User = {
  //     token: 'token de teste'
  //   };
  //   userService.getUserInformation()
  //     .subscribe(response => {
  //       expect(req.request.method).toBe('GET');
  //       expect(response).toEqual(expectedResponse);
  //       expect(userService.currentLoginValue).not.toBeNull();
  //       expect(localStorage.getItem('currentUser')).not.toBeNull();
  //     });
  //   const expectedURL = `${environment.user.login}`;
  //   const req = httpMock.expectOne(expectedURL);
  //   req.flush(expectedResponse);
  // });
});
