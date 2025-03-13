import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs/internal/observable/of';
import { Mock } from 'jasmine-mock-factory-newer';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TestSuite } from 'test-suite';
import { mockServices } from 'app/core/tests/mock-helper.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { FlexConditionComponent } from './flex-condition.component';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import { FlexConditionResultModel } from 'app/core/services/flex-condition/flex-condition.model';

describe('FlexConditionComponent', () => {
  let component: FlexConditionComponent;
  let fixture: ComponentFixture<FlexConditionComponent>;
  let flexConditionService: Mock<FlexConditionService>;
  let routerMock: Mock<Router>;
  let toastrServiceMock: Mock<ToastrService>;
  TestSuite.configure();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlexConditionComponent
      ],
      imports: [
        GridModule,
        RouterTestingModule,
        ToastrModule.forRoot()],
      providers: [
        ...mockServices([
          { provide: APP_BASE_HREF },
          HttpClientTestingModule,
          HttpClientModule,
          Router,
          FlexConditionService,
          ToastrService
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexConditionComponent);
    component = fixture.componentInstance;
    const get = TestBed.get;
    routerMock = get(Router);
    toastrServiceMock = get(ToastrService);
    flexConditionService = get(FlexConditionService);
    flexConditionService._spy.getAllFlexConditions._func.and.returnValue(of(
      {}
    ));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render gridData with 2', () => {
    flexConditionService._spy.getAllFlexConditions._func.and.returnValue(of(
      get2FlexConditionTables()
    ));
    component.ngOnInit();
    expect(component.gridData.length === 2).toBeTruthy();
  });

  it('should call toastr if an error is thrown', () => {
    flexConditionService._spy.getAllFlexConditions._func.and.returnValue(throwError({ status: 404 }));
    toastrServiceMock._spy.error._func.and.returnValue('');
    component.ngOnInit();
    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should fire click flexConditionTableActions', () => {
    flexConditionService._spy.getAllFlexConditions._func.and.returnValue(of(
      get2FlexConditionTables()
    ));

    component.ngOnInit();
    fixture.detectChanges();

    component.gridActions = [ 'Ação' ];

    spyOn(component, 'flexConditionTableActions');

    const myElement = fixture.debugElement.queryAll(By.css('.grid__actions'));
    myElement[0].triggerEventHandler('click', { Row: { Id: 4 }, ActionIndex: 0 });

    expect(component.flexConditionTableActions).toHaveBeenCalled();
  });

  it('should fire click flexConditionTableActions and navigate to Duplicate page', () => {

    component.flexConditionTableActions({ Row: { Id: 4 }, ActionIndex: 0 });
    expect(routerMock.navigate).toHaveBeenCalledWith(['flex-condition/duplicate', 4]);

  });

  it('should fire click flexConditionTableActions and navigate to Duplicate page', () => {

    component.flexConditionTableActions({ Row: { Id: 5 }, ActionIndex: 1 });
    expect(routerMock.navigate).toHaveBeenCalledWith(['flex-condition/detail', 5]);

  });

  function get2FlexConditionTables(): FlexConditionResultModel {
    return {
      Result: [{
        'Id': 1,
        'ApprovalFlowStatus': 2,
        'ApprovalFlowStatusDescription': 'Aprovado',
        'EffectiveDate': '2020-09-01T00:00:00',
        'EndDate': '2020-09-30T00:00:00',
        'RegisterDate': '2020-08-14T13:53:45',
        'ApprovalDate': '2020-08-19T17:09:56',
        'EmployeeFunctionalRegister': '738043',
        'EmployeeFunctionalApproval': '738043',
        'Active': true,
        'ActionComment': null,
        'ApprovalSecurityGroups': [],
        'ApprovalFlowStatusInt': 2
      },
      {
        'Id': 2,
        'ApprovalFlowStatus': 3,
        'ApprovalFlowStatusDescription': 'Reprovado',
        'EffectiveDate': '2020-09-01T00:00:00',
        'EndDate': '2020-09-30T00:00:00',
        'RegisterDate': '2020-08-27T18:00:17',
        'ApprovalDate': null,
        'EmployeeFunctionalRegister': '738043',
        'EmployeeFunctionalApproval': null,
        'Active': false,
        'ActionComment': null,
        'ApprovalSecurityGroups': [],
        'ApprovalFlowStatusInt': 3
      }]
    };
  }
});
