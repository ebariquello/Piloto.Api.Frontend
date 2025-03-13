import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { TestSuite } from 'test-suite';
import { of } from 'rxjs/internal/observable/of';
import { Mock } from 'jasmine-mock-factory-newer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { DetailFlexConditionComponent } from 'app/modules/flex-condition/pages/detail-flex-condition/detail-flex-condition.component';
import { mockServices } from 'app/core/tests/mock-helper.service';
import { TableModule } from 'app/shared/components/table/table.module';
import { CommentFormModule } from 'app/shared/components/comment-form/comment-form.module';
import { throwError } from 'rxjs/internal/observable/throwError';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';

describe('DetailFlexConditionComponent', () => {
  let component: DetailFlexConditionComponent;
  let fixture: ComponentFixture<DetailFlexConditionComponent>;
  let detailFlexConditionService: Mock<DetailFlexConditionService>;
  let toastrServiceMock: Mock<ToastrService>;
  TestSuite.configure();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailFlexConditionComponent
      ],
      imports: [
        GridModule,
        RouterTestingModule,
        TableModule,
        CommentFormModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        ...mockServices([
          { provide: APP_BASE_HREF },
          DetailFlexConditionService,
          ToastrService
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFlexConditionComponent);
    component = fixture.componentInstance;
    const get = TestBed.get;
    toastrServiceMock = get(ToastrService);
    detailFlexConditionService = get(DetailFlexConditionService);
    detailFlexConditionService._spy.getDetailsFlexConditionTable._func.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get getDetailsFlexConditionTable by Table Id equal 1 and show status waiting title', async () => {
    detailFlexConditionService._spy.getDetailsFlexConditionTable._func.and.returnValue(of({
      Result: {
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
        'ApprovalFlowStatusInt': 1,
        'ApprovalFlowStatusDescription': 'Aguardando aprovação',
        'EffectiveDate': '2020-08-15T00:00:00',
        'EndDate': '2020-08-31T00:00:00',
        'RegisterDate': '2020-08-14T09:36:20',
        'ApprovalDate': '2020-08-19T16:42:12',
        'EmployeeFunctionalRegister': '738284',
        'EmployeeFunctionalApproval': '738043',
        'Active': true,
        'ActionComment': null,
        'ApprovalSecurityGroups': [
          'GS_G_UK_APROVADOR'
        ]
      }
    }));

    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.viewData).not.toBeNull();
      expect(component.viewData.Id).toEqual(1);
      expect(component.pageTitle).toEqual('Detalhes da solicitação de condições mínimas de flex');
      expect(component.tableWaitingApproval).toBeTruthy();
    });
  });

  it('should call toastr if an error is thrown', () => {
    detailFlexConditionService._spy.getDetailsFlexConditionTable._func.and.returnValue(throwError({ status: 404 }));
    toastrServiceMock._spy.error._func.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    expect(toastrServiceMock.error).toHaveBeenCalled();
    expect(component.tableWaitingApproval).toBeFalsy();
  });

});
