import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestSuite } from 'test-suite';
import { ToastrModule } from 'ngx-toastr';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { FormLoginComponent } from 'app/modules/login/components/form-login/form-login.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerMock: Mock<Router>;

  TestSuite.configure();

  beforeEach(() => {

    routerMock = MockFactory.create(Router);

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent,
        FormLoginComponent
      ],
      providers: [
        { provide: Router, useFactory: () => routerMock },
      ]
    });

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
