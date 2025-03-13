// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { APP_BASE_HREF } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';

// import { TestSuite } from 'test-suite';
// import { Mock } from 'jasmine-mock-factory-newer';
// import { of } from 'rxjs/internal/observable/of';
// import { throwError } from 'rxjs/internal/observable/throwError';
// import { ToastrService, ToastrModule } from 'ngx-toastr';
// import { DetailDiscountParameterComponent } from './detail-discount-parameter.component';
// import { DetailDiscountParameterService } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.service';
// import { mockServices } from 'app/core/tests/mock-helper.service';
// import { ToggleEmployeeModule } from 'app/shared/components/toggle-employee/toggle-employee.module';
// import { CommentFormModule } from 'app/shared/components/comment-form/comment-form.module';
// import { TableModule } from 'app/shared/components/table/table.module';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('DetailDiscountParameterComponent', () => {
//   let component: DetailDiscountParameterComponent;
//   let fixture: ComponentFixture<DetailDiscountParameterComponent>;
//   let detailDiscountParameterService: Mock<DetailDiscountParameterService>;
//   let activatedRouteMock: Mock<ActivatedRoute>;
//   let toastrServiceMock: Mock<ToastrService>;
//   TestSuite.configure();

//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       declarations: [
//         DetailDiscountParameterComponent
//       ],
//       imports: [
//         TableModule,
//         RouterTestingModule,
//         ToggleEmployeeModule,
//         ToggleEmployeeModule,
//         CommentFormModule,
//         HttpClientTestingModule,
//         ToastrModule.forRoot(),
//         RouterModule.forRoot([])
//       ],
//       providers: [
//         ...mockServices([
//           { provide: APP_BASE_HREF },
//           ActivatedRoute,
//           DetailDiscountParameterService,
//           ToastrService
//         ])
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DetailDiscountParameterComponent);
//     component = fixture.componentInstance;
//     const get = TestBed.get;
//     activatedRouteMock = get(ActivatedRoute);
//     toastrServiceMock = get(ToastrService);
//     detailDiscountParameterService = get(DetailDiscountParameterService);
//     activatedRouteMock._spy.params._get.and.returnValue(of({}));
//     detailDiscountParameterService._spy.getDetailsDiscountParameterTable._func.and.returnValue(of(
//       {}
//     ));
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should tableWaitingApproval to be falsy on init', async () => {
//     expect(component.tableWaitingApproval).toBeFalsy();
//   }
//   );

//   it('should get Detail Discount Parameter Table by Table Id equal 1', async () => {
//     expect(component.tableWaitingApproval).toBeFalsy();

//     //arrange
//     activatedRouteMock._spy.params._get.and.returnValue(of({ id: '1' }));
//     detailDiscountParameterService._spy.getDetailsDiscountParameterTable._func.and.returnValue(of({
//       Result: {
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
//         'Id': 1,
//         'ApprovalFlowStatus': 2,
//         'ApprovalFlowStatusDescription': 'Aprovado',
//         'EffectiveDate': '2020-08-15T00:00:00',
//         'EndDate': '2020-08-31T00:00:00',
//         'RegisterDate': '2020-08-14T09:36:20',
//         'ApprovalDate': '2020-08-19T16:42:12',
//         'EmployeeFunctionalRegister': '738284',
//         'EmployeeFunctionalApproval': '738043',
//         'Active': true,
//         'ActionComment': null,
//         'ApprovalSecurityGroups': [
//           'GS_G_UK_APROVADOR'
//         ],
//         'ApprovalFlowStatusInt': 2
//       }
//     }));

//     //act
//     component.ngOnInit();
//     fixture.detectChanges();

//     //assert
//     fixture.whenStable().then(() => {
//       expect(component.viewData).not.toBeNull();
//       expect(component.viewData.Id).toEqual(1);
//     });

//   });

//   it('should get Detail Discount Parameter Table by Table Id equal 2 and show status waiting title', async () => {
//     //arrange
//     activatedRouteMock._spy.params._get.and.returnValue(of({ id: '2' }));
//     detailDiscountParameterService._spy.getDetailsDiscountParameterTable._func.and.returnValue(of({
//       Result: {
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
//         'Id': 2,
//         'ApprovalFlowStatus': 1,
//         'ApprovalFlowStatusDescription': 'Aguardando aprovação',
//         'EffectiveDate': '2020-08-15T00:00:00',
//         'EndDate': '2020-08-31T00:00:00',
//         'RegisterDate': '2020-08-14T09:36:20',
//         'ApprovalDate': '2020-08-19T16:42:12',
//         'EmployeeFunctionalRegister': '738284',
//         'EmployeeFunctionalApproval': '738043',
//         'Active': true,
//         'ActionComment': null,
//         'ApprovalSecurityGroups': [
//           'GS_G_UK_APROVADOR'
//         ],
//         'ApprovalFlowStatusInt': 1
//       }
//     }));

//     //act
//     component.ngOnInit();
//     fixture.detectChanges();

//     //assert
//     fixture.whenStable().then(() => {
//       expect(component.viewData).not.toBeNull();
//       expect(component.viewData.Id).toEqual(2);
//       expect(component.tableWaitingApproval).toBeTruthy();
//     });

//   });

//   it('should call toastr if an error is thrown', () => {
//     activatedRouteMock._spy.params._get.and.returnValue(of({ id: '1' }));
//     detailDiscountParameterService._spy.getDetailsDiscountParameterTable._func.and.returnValue(throwError({ status: 404 }));
//     toastrServiceMock._spy.error._func.and.returnValue(null);
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(toastrServiceMock.error).toHaveBeenCalled();
//     expect(component.tableWaitingApproval).toBeFalsy();
//   });
// });
