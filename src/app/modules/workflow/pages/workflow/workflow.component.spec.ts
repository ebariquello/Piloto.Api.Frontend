import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockFactory, Mock } from 'jasmine-mock-factory-newer';
import { of } from 'rxjs/internal/observable/of';
import { WorkflowComponent } from './workflow.component';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { WorkflowService } from 'app/core/services/workflow/workflow.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TestSuite } from 'test-suite';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('WorkflowComponent', () => {
  let component: WorkflowComponent;
  let fixture: ComponentFixture<WorkflowComponent>;
  let workflowServiceMock: Mock<WorkflowService>;
  let toastrServiceMock: Mock<ToastrService>;
  let routerMock: Mock<Router>;

  TestSuite.configure();

  beforeEach(async(() => {
    workflowServiceMock = MockFactory.create(WorkflowService);
    toastrServiceMock = MockFactory.create(ToastrService);
    routerMock = MockFactory.create(Router);
    TestBed.configureTestingModule({
      declarations: [WorkflowComponent],
      imports: [
        CommonModule,
        GridModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: WorkflowService, useFactory: () => workflowServiceMock },
        { provide: ToastrService, useFactory: () => toastrServiceMock },
        { provide: Router, useFactory: () => routerMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    toastrServiceMock = TestBed.get(ToastrService);
    workflowServiceMock = TestBed.get(WorkflowService);
    routerMock = TestBed.get(Router);
    workflowServiceMock._spy.getWorkflowPending._func.and.returnValue(of({}));
    workflowServiceMock._spy.getWorkflowSubmitted._func.and.returnValue(of({}));
    fixture = TestBed.createComponent(WorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get workflow on init', () => {
    spyOn(component, 'getPending');
    component.ngOnInit();
    expect(component.getPending).toHaveBeenCalled();
  });

  it('should return getWorkflowPending with 2 values', () => {
    workflowServiceMock._spy.getWorkflowPending._func.and.returnValue(of({
      Result: [
        {
          'Id': 4,
          'ApprovalFlowStatus': 1,
          'ApprovalFlowStatusDescription': 'Aguardando Aprovação',
          'EffectiveDate': '2020-01-01T00:00:00',
          'EndDate': '2020-12-31T00:00:00',
          'RegisterDate': '2020-01-01T15:45:00',
          'ApprovalDate': '2020-09-03T15:08:22',
          'EmployeeFunctionalRegister': null,
          'EmployeeFunctionalApproval': '738284',
          'Active': false,
          'ActionComment': null,
          'ApprovalSecurityGroups': [],
          'ApprovalFlowStatusInt': 1
        },
        {
          'Id': 5,
          'ApprovalFlowStatus': 1,
          'ApprovalFlowStatusDescription': 'Aguardando Aprovação',
          'EffectiveDate': '2020-01-01T00:00:00',
          'EndDate': '2020-01-01T00:00:00',
          'RegisterDate': '2020-01-01T18:01:00',
          'ApprovalDate': '2020-09-03T15:08:22',
          'EmployeeFunctionalRegister': null,
          'EmployeeFunctionalApproval': '738284',
          'Active': false,
          'ActionComment': null,
          'ApprovalSecurityGroups': [],
          'ApprovalFlowStatusInt': 1
        }]
    }));
    component.ngOnInit();
    expect(component.gridDataPending.length === 2).toBeTruthy();
  });

  it('should call toastr if an error is thrown in getWorkflowPending', () => {
    workflowServiceMock._spy.getWorkflowPending._func.and.returnValue(throwError({ status: 404 }));
    toastrServiceMock._spy.error._func.and.returnValue('');
    component.ngOnInit();
    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should return getWorkflowSubmitted with 2 value', () => {
    workflowServiceMock._spy.getWorkflowSubmitted._func.and.returnValue(of({
      Result: [
        {
          'Id': 4,
          'ApprovalFlowStatus': 1,
          'ApprovalFlowStatusDescription': 'Aguardando Aprovação',
          'EffectiveDate': '2020-01-01T00:00:00',
          'EndDate': '2020-12-31T00:00:00',
          'RegisterDate': '2020-01-01T15:45:00',
          'ApprovalDate': '2020-09-03T15:08:22',
          'EmployeeFunctionalRegister': null,
          'EmployeeFunctionalApproval': '738284',
          'Active': false,
          'ActionComment': null,
          'ApprovalSecurityGroups': [],
          'ApprovalFlowStatusInt': 1
        },
        {
          'Id': 5,
          'ApprovalFlowStatus': 1,
          'ApprovalFlowStatusDescription': 'Aguardando Aprovação',
          'EffectiveDate': '2020-01-01T00:00:00',
          'EndDate': '2020-01-01T00:00:00',
          'RegisterDate': '2020-01-01T18:01:00',
          'ApprovalDate': '2020-09-03T15:08:22',
          'EmployeeFunctionalRegister': null,
          'EmployeeFunctionalApproval': '738284',
          'Active': false,
          'ActionComment': null,
          'ApprovalSecurityGroups': [],
          'ApprovalFlowStatusInt': 1
        }]
    }));
    component.ngOnInit();
    expect(component.gridDataSubmitted.length === 2).toBeTruthy();
  });

  it('should call toastr if an error is thrown in getWorkflowSubmitted', () => {
    workflowServiceMock._spy.getWorkflowSubmitted._func.and.returnValue(throwError({ status: 404 }));
    toastrServiceMock._spy.error._func.and.returnValue('');
    component.ngOnInit();
    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should navigate to discount-parameter/detail/id', () => {
    component.detailsPendency({
      ActionIndex: 0,
      Row: { Id: 32, OriginSubmittedApproval: 'Parâmetros de Desconto' }
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['discount-parameter/detail', 32]);
  });
});
