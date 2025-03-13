import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockFactory, Mock } from 'jasmine-mock-factory-newer';
import { HomeComponent } from './home.component';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TestSuite } from 'test-suite';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let toastrServiceMock: Mock<ToastrService>;
  let routerMock: Mock<Router>;

  TestSuite.configure();

  beforeEach(async(() => {
    toastrServiceMock = MockFactory.create(ToastrService);
    routerMock = MockFactory.create(Router);
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        CommonModule,
        GridModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [{ provide: Router, useFactory: () => routerMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    toastrServiceMock = TestBed.get(ToastrService);

    routerMock = TestBed.get(Router);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
