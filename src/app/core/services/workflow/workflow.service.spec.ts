import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { WorkflowService } from './workflow.service';
import { TestSuite } from 'test-suite';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { environment } from 'environments/environment';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('WorkflowService', () => {
  let httpClientMock: Mock<HttpClient>;
  let workflowService: WorkflowService;

  TestSuite.configure();

  beforeEach(() => {
    httpClientMock = MockFactory.create(HttpClient);
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useFactory: () => httpClientMock }
      ],
    }).compileComponents();

    workflowService = new WorkflowService(httpClientMock);
  });

  it('should be created', () => {
    expect(workflowService).toBeTruthy();
  });

  it('should getWorkflowPending()', (done) => {
    const expectedReturn = {
      'Result': [
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
        }
      ],
      'Message': null,
      'ErrorDetail': null
    };

    httpClientMock._spy.get._func.and.returnValue(of(expectedReturn));

    workflowService.getWorkflowPending().subscribe(res => {
      const expectedURL = `${environment.workflows.pending}`;
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedURL);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedReturn);
      done();
    },
      () => {
        fail();
        done();
      }
    );
  });

  it('should getWorkflowSubmitted()', (done) => {
    const expectedReturn = {
      'Result': [
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
        }
      ],
      'Message': null,
      'ErrorDetail': null
    };

    httpClientMock._spy.get._func.and.returnValue(of(expectedReturn));

    workflowService.getWorkflowSubmitted().subscribe(res => {
      const expectedURL = `${environment.workflows.submitted}`;
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedURL);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedReturn);
      done();
    },
      () => {
        fail();
        done();
      }
    );
  });

  it('show show toastr if an error thrown', () => {
    spyOn(workflowService, 'getWorkflowSubmitted').and.returnValue(throwError({ status: 404 }));
    workflowService.getWorkflowSubmitted().subscribe(
      () => {},
      err => expect(err.status).toEqual(404)
    );
  });

});
