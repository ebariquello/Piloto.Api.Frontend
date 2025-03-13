import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { TestSuite } from 'test-suite';
import { of } from 'rxjs/internal/observable/of';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { environment } from 'environments/environment';
import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';


describe('DetailFlexConditionService', () => {
  let httpClientMock: Mock<HttpClient>;
  let detailFlexConditionService: DetailFlexConditionService;

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

    detailFlexConditionService = new DetailFlexConditionService(httpClientMock);
  });

  it('should be created', () => {
    expect(detailFlexConditionService).toBeTruthy();
  });

  it('should getDetailsFlexConditionTable()', (done) => {
    const expectedReturn = {
      'Result': {
          'MinimumFlexConditions': [
              {
                  'Id': 5,
                  'MinimumFlexConditionTableId': 1,
                  'PaymentProduct': 123,
                  'Modality': 12
              },
              {
                  'Id': 6,
                  'MinimumFlexConditionTableId': 1,
                  'PaymentProduct': 1234,
                  'Modality': 123
              },
              {
                  'Id': 7,
                  'MinimumFlexConditionTableId': 1,
                  'PaymentProduct': 12345,
                  'Modality': 1234
              }
          ],
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
          'ApprovalSecurityGroups': [
              'SG_UK_APROVADOR'
          ],
          'ApprovalFlowStatusInt': 2
      },
      'Message': null,
      'ErrorDetail': null
  };

    httpClientMock._spy.get._func.and.returnValue(of(expectedReturn));

    detailFlexConditionService.getDetailsFlexConditionTable(4).subscribe(res => {
      const tableId = 4;
      const expectedURL = `${environment.flexConditions.details}${tableId}`;
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

  it('should completeTaskFlexCondition()', (done) => {
    const expected = {
      'Result': null,
      'Message': 'A tabela:8 de condições mínimas de flex foi:Aprovado com sucesso',
      'ErrorDetail': null
    };

    httpClientMock._spy.post._func.and.returnValue(of(expected));

    detailFlexConditionService.completeTaskFlexCondition(4, null, CompleteTaskEnum.AGUARDANDO_ATIVACAO).subscribe(res => {
      const expectedURL = `${environment.flexConditions.completeTask}`;
      expect(httpClientMock.post).toHaveBeenCalledWith(expectedURL, { TableID: 4, Comment: null, Action: 5 });
      expect(httpClientMock.post).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expected);
      done();
    },
      () => {
        fail();
        done();
      }
    );
  });
});
