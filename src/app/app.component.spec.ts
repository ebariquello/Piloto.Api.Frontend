import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestSuite } from 'test-suite';
import { AppComponent } from './app.component';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { UserService } from 'app/core/services/login/user.service';
import { of } from 'rxjs/internal/observable/of';
import { HeaderModule } from 'app/core/header/header.module';


describe('AppComponent', () => {
  let userServiceMock: Mock<UserService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  TestSuite.configure();

  beforeEach(async(() => {

    userServiceMock = MockFactory.create(UserService);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService, useFactory: () => userServiceMock
        },
        { provide: APP_BASE_HREF, useValue: '/' },
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        HeaderModule,
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]

    });

    userServiceMock = TestBed.get(UserService);
    userServiceMock._spy.currentUser._get.and.returnValue(of({}));
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
