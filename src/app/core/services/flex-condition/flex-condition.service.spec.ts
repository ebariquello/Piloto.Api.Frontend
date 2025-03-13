import { TestBed, } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { FlexConditionService } from './flex-condition.service';
import { TestSuite } from 'test-suite';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { environment } from 'environments/environment';
import { of } from 'rxjs/internal/observable/of';

describe('FlexConditionService', () => {
  let httpClientMock: Mock<HttpClient>;
  let flexConditionService: FlexConditionService;

  TestSuite.configure();

  beforeEach(() => {
    httpClientMock = MockFactory.create(HttpClient);
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        { provide: HttpClient, useFactory: () => httpClientMock }
      ],
    }).compileComponents();

    flexConditionService = new FlexConditionService(httpClientMock);
  });

  it('should be created', () => {
    expect(flexConditionService).toBeTruthy();
  });

  it('should getAllFlexConditions()', (done) => {
    const expectedReturn = {
      'Result': [
        {
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
        },
        {
          'Id': 3,
          'ApprovalFlowStatus': 3,
          'ApprovalFlowStatusDescription': 'Reprovado',
          'EffectiveDate': '2020-08-29T00:00:00',
          'EndDate': '2020-08-31T00:00:00',
          'RegisterDate': '2020-08-28T09:36:58',
          'ApprovalDate': null,
          'EmployeeFunctionalRegister': '738284',
          'EmployeeFunctionalApproval': null,
          'Active': false,
          'ActionComment': null,
          'ApprovalSecurityGroups': [],
          'ApprovalFlowStatusInt': 3
        }
      ],
      'Message': null,
      'ErrorDetail': null
    };

    httpClientMock._spy.get._func.and.returnValue(of(expectedReturn));

    flexConditionService.getAllFlexConditions().subscribe(res => {
      const expectedURL = `${environment.flexConditions.queryAllConditions}`;
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

  it('should addFlexTable()', (done) => {
    const body = {
      'EffectiveDate': '2020-09-05',
      'EndDate': '2020-12-31',
      'MinimumFlexConditions':
        [
          {
            'PaymentProduct': 1,
            'Modality': 4
          },
          {
            'PaymentProduct': 12,
            'Modality': 10
          },
          {
            'PaymentProduct': 3,
            'Modality': 5
          }
        ]
    };

    const expectedReturn = {
      'Result': 4,
      'Message': 'O cadastro da Tabela de Condições Mínimas de Flex foi realizado com sucesso',
      'ErrorDetail': null
    };

    httpClientMock._spy.post._func.and.returnValue(of(expectedReturn));

    flexConditionService.addFlexTable(body).subscribe(res => {
      const expectedURL = `${environment.flexConditions.addFlex}`;
      expect(httpClientMock.post).toHaveBeenCalledWith(expectedURL, body);
      expect(httpClientMock.post).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedReturn);
      done();
    },
      () => {
        fail();
        done();
      }
    );
  });
});
