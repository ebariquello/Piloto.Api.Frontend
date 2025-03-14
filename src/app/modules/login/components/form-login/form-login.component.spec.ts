import { TestSuite } from 'test-suite';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormLoginComponent } from 'app/modules/login/components/form-login/form-login.component';
import { of } from 'rxjs/internal/observable/of';
import { UserService } from 'app/core/services/login/user.service';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let toastrService: ToastrService;
  let router: Router;
  let userService: UserService;

  TestSuite.configure();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [FormLoginComponent],
      providers: [ToastrService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    toastrService = TestBed.get(ToastrService);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toaster if form is not valid', () => {
    component.formLogin.get('email').setValue('');
    component.formLogin.get('password').setValue('');

    const toastrSpy = spyOn(toastrService, 'error');
    component.sendForm();
    expect(toastrSpy).toHaveBeenCalledWith('Fill required fields');
  });

  it('should go to path if credentials are valid', fakeAsync(() => {
    component.formLogin.get('email').setValue('teste');
    component.formLogin.get('password').setValue('123');

    spyOn(userService, 'login').and.returnValue(
      of({
        success: true,
        token: 'meu token de teste',
      })
    );

    const navigateSpy = spyOn(router, 'navigate');
    component.sendForm();
    expect(navigateSpy).toHaveBeenCalledWith(['workflow']);

    tick();
  }));

  it('should show toastr if credentials are invalid', fakeAsync(() => {
    component.formLogin.get('email').setValue('teste@teste.com');
    component.formLogin.get('password').setValue('123');

    spyOn(userService, 'login').and.returnValue(throwError({ status: 404 }));

    const toastrSpy = spyOn(toastrService, 'error');
    component.sendForm();
    expect(toastrSpy).toHaveBeenCalled();

    tick();
  }));
});
