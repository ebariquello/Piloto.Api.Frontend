import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { TestSuite } from 'test-suite';
import { of } from 'rxjs/internal/observable/of';
import { MockFactory, Mock } from 'jasmine-mock-factory-newer';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header.component';
import { UserService } from 'app/core/services/login/user.service';
import { throwError } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceMock: Mock<UserService>;
  let toastrServiceMock: Mock<ToastrService>;

  TestSuite.configure();

  beforeEach(async(() => {
    userServiceMock = MockFactory.create(UserService);
    toastrServiceMock = MockFactory.create(ToastrService);
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: UserService, useFactory: () => userServiceMock },
        { provide: ToastrService, useFactory: () => toastrServiceMock },
      ],
    }).compileComponents();
    localStorage.clear();
  }));

  beforeEach(() => {
    userServiceMock = TestBed.get(UserService);
    toastrServiceMock = TestBed.get(ToastrService);

    userServiceMock._spy.currentUser._get.and.returnValue(of({}));
    userServiceMock._spy.currentLogin._get.and.returnValue(of({}));
    userServiceMock._spy.currentUserInformation._get.and.returnValue(of({}));

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedin to false if user is not logged', async () => {
    userServiceMock._spy.currentLogin._get.and.returnValue(
      of({
        token: '',
        success: false,
      })
    );

    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isLoggedin).toBeFalsy();
    });
  });

  it('should show toaster if an error is thrown', () => {
    userServiceMock._spy.currentLogin._get.and.returnValue(
      throwError({ status: 409 })
    );

    component.ngOnInit();
    toastrServiceMock._spy.error._func.and.returnValue(null);

    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should set isUser to true if user logged', fakeAsync(() => {
    userServiceMock._spy.currentLogin._get.and.returnValue(
      of({
        success: true,
        token: 'meu token de teste',
      })
    );

    // userServiceMock._spy.currentLogin._get.and.returnValue(
    //   of({
    //     id: '738043',
    //     name: 'Teste User 01',
    //   })
    // );

    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(component.isLoggedin).toBeTruthy();
    // fixture.whenStable().then(() => {

    // });
  }));

  it('should call toastrService.error if there is an error on getUserInformation', () => {
    // Mock successful login
    userServiceMock._spy.currentLogin._get.and.returnValue(
      of({
        success: true, // Ensure isLoggedin is true so getUserInfo is called
        token: 'meu token de teste',
      })
    );

    // Mock getUserInformation to return an error
    userServiceMock._spy.currentUser._get.and.returnValue(
      throwError({ message: 'Error' })
    );

    // Spy on toastrService.error to verify it is called on error
    toastrServiceMock._spy.error._func.and.returnValue('Error');

    // Call ngOnInit which will trigger the service calls
    component.ngOnInit();
    fixture.detectChanges();

    // Ensure that currentLogin was called
    expect(userServiceMock._spy.currentLogin._get).toHaveBeenCalled();

    // Ensure getUserInfo is called (since currentLogin.success is true)
    expect(userServiceMock._spy.currentUser._get).toHaveBeenCalled();

    // Ensure that toastrService.error was called with the error message
    expect(toastrServiceMock._spy.error._func).toHaveBeenCalledWith({
      message: 'Error',
    });
  });

  it('should logout when user clicks button', () => {
    component.isLoggedin = true;
    fixture.detectChanges();

    spyOn(component, 'logoutUser');
    fixture.debugElement
      .query(By.css('.logout-button'))
      .triggerEventHandler('click', null);

    expect(component.logoutUser).toHaveBeenCalled();
  });

  it('should close sub menus and call user service when user logs out', () => {
    const spyUserService =
      userServiceMock._spy.logout._func.and.returnValue(null);
    component.showSubMenus = [true, false];
    component.logoutUser();

    // component.ngOnInit();
    // fixture.detectChanges();

    expect(component.showSubMenus[0] && component.showSubMenus[1]).toBeFalsy();
    expect(component.isLoggedin).toBeFalsy();
    expect(spyUserService).toHaveBeenCalled();
  });

  it('should close all sub menus', () => {
    component.showSubMenus = [true, false];
    component.toggleSubMenu(0);

    expect(component.showSubMenus[0] && component.showSubMenus[1]).toBeFalsy();
  });

  it('should open selected sub menu', () => {
    component.showSubMenus = [true, false];
    component.toggleSubMenu(1);

    expect(component.showSubMenus[1]).toBeTruthy();
    expect(component.showSubMenus[0]).toBeFalsy();
  });
});
