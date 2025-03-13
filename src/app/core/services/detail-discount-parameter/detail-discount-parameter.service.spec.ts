// import { TestBed } from '@angular/core/testing';
// import { HttpClient } from '@angular/common/http';

// import { TestSuite } from 'test-suite';
// import { of } from 'rxjs/internal/observable/of';
// import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
// import { environment } from 'environments/environment';
// import { DetailDiscountParameterService } from './detail-discount-parameter.service';
// import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';

// describe('DetailDiscountParameterService', () => {
//   let httpClientMock: Mock<HttpClient>;
//   let detailDiscountParameterService: DetailDiscountParameterService;

//   TestSuite.configure();

//   beforeEach(() => {
//     httpClientMock = MockFactory.create(HttpClient);
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [],
//       providers: [
//         { provide: HttpClient, useFactory: () => httpClientMock }
//       ],
//     }).compileComponents();

//     detailDiscountParameterService = new DetailDiscountParameterService(httpClientMock);
//   });

//   it('should be created', () => {
//     expect(detailDiscountParameterService).toBeTruthy();
//   });

//   it('should getDetailsDiscountParameterTable()', (done) => {
//     const expectedReturn = {
//       'Result':
//       {
//         'DiscountParameters': [
//           {
//             'Id': 10,
//             'FlexDiscountTableId': 4,
//             'InitialBilling': 0.01,
//             'FinalBilling': 9999.99,
//             'Terminals': 4,
//             'DiscountWithFlex': 5.00,
//             'DiscountWithoutFlex': 2.00
//           },
//           {
//             'Id': 11,
//             'FlexDiscountTableId': 4,
//             'InitialBilling': 10000.00,
//             'FinalBilling': 19999.99,
//             'Terminals': 4,
//             'DiscountWithFlex': 5.00,
//             'DiscountWithoutFlex': 2.00
//           },
//           {
//             'Id': 12,
//             'FlexDiscountTableId': 4,
//             'InitialBilling': 20000.00,
//             'FinalBilling': 29999.99,
//             'Terminals': 4,
//             'DiscountWithFlex': 5.00,
//             'DiscountWithoutFlex': 2.00
//           }
//         ],
//         'Id': 4,
//         'ApprovalFlowStatus': 1,
//         'ApprovalFlowStatusDescription': 'Aguardando Aprovação',
//         'EffectiveDate': '2020-01-01T00:00:00',
//         'EndDate': '2020-12-31T00:00:00',
//         'RegisterDate': '2020-01-01T15:45:00',
//         'ApprovalDate': '2020-09-03T15:08:22',
//         'EmployeeFunctionalRegister': '738284',
//         'EmployeeFunctionalApproval': '738284',
//         'Active': false,
//         'ActionComment': null,
//         'ApprovalSecurityGroups': [
//           'GS_G_UK_APROVADOR'
//         ],
//         'ApprovalFlowStatusInt': 1
//       }
//       ,
//       'Message': null,
//       'ErrorDetail': null
//     };

//     httpClientMock._spy.get._func.and.returnValue(of(expectedReturn));

//     detailDiscountParameterService.getDetailsDiscountParameterTable(4).subscribe(res => {
//       const tableId = 4;
//       const expectedURL = `${environment.parameters.details}${tableId}`;
//       expect(httpClientMock.get).toHaveBeenCalledWith(expectedURL);
//       expect(httpClientMock.get).toHaveBeenCalledTimes(1);
//       expect(res).toEqual(expectedReturn);
//       done();
//     },
//       () => {
//         fail();
//         done();
//       }
//     );
//   });

//   it('should completeTaskDiscountParameter()', (done) => {
//     const expected = {
//       'Result': null,
//       'Message': 'A tabela:8 de paramêtros de descontos foi:Aprovado com sucesso',
//       'ErrorDetail': null
//     };

//     httpClientMock._spy.post._func.and.returnValue(of(expected));

//     detailDiscountParameterService.completeTaskDiscountParameter(4, null, CompleteTaskEnum.AGUARDANDO_ATIVACAO).subscribe(res => {
//       const expectedURL = `${environment.parameters.completeTask}`;
//       expect(httpClientMock.post).toHaveBeenCalledWith(expectedURL, { TableID: 4, Comment: null, Action: 5 });
//       expect(httpClientMock.post).toHaveBeenCalledTimes(1);
//       expect(res).toEqual(expected);
//       done();
//     },
//       () => {
//         fail();
//         done();
//       }
//     );
//   });
// });
