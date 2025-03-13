import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CommentFormComponent } from './comment-form.component';
import { DetailDiscountParameterService } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.service';
import { ModalDenyModule } from 'app/shared/components/modal-deny/modal-deny.module';
import { ModalApproveModule } from 'app/shared/components/modal-approve/modal-approve.module';
import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';
import { TableTypeEnum } from 'app/shared/enums/table-type.enum';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let detailDiscountParameterService: DetailDiscountParameterService;
  let detailFlexConditionService: DetailFlexConditionService;
  let toastr: ToastrService;
  let router: Router;
  let modal: NgxSmartModalService;

  const successResult = {
    'Result': null,
    'Message': 'A tabela:8 de paramêtros de descontos foi:Aprovado com sucesso',
    'ErrorDetail': null
  };

  const errorResult = {
    'Result': null,
    'Message': 'A tabela:8 de paramêtros de descontos foi:Aprovado com sucesso',
    'ErrorDetail': 'Error detail'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ModalDenyModule,
        ModalApproveModule,
        ToastrModule.forRoot(),
        NgxSmartModalModule.forChild()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    detailDiscountParameterService = TestBed.get(DetailDiscountParameterService);
    detailFlexConditionService = TestBed.get(DetailFlexConditionService);
    toastr = TestBed.get(ToastrService);
    router = TestBed.get(Router);
    modal = TestBed.get(NgxSmartModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tableType = TableTypeEnum.DISCOUNT_PARAMETER;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should completeTask successfully', () => {
    spyOn(detailDiscountParameterService, 'completeTaskDiscountParameter').and.returnValue(of(successResult));
    spyOn(toastr, 'success');
    spyOn(router, 'navigate');

    component.completeTask(CompleteTaskEnum.AGUARDANDO_ATIVACAO);

    expect(toastr.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/workflow']);
  });

  it('should completeTask successfully when type is flex conditions', () => {
    component.tableType = TableTypeEnum.FLEX_CONDITION;
    spyOn(detailFlexConditionService, 'completeTaskFlexCondition').and.returnValue(of(successResult));
    spyOn(toastr, 'success');
    spyOn(router, 'navigate');

    component.completeTask(CompleteTaskEnum.AGUARDANDO_ATIVACAO);

    expect(toastr.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/workflow']);
  });

  it('should completeTask and show error message', () => {
    // spyOn(detailDiscountParameterService, 'completeTaskDiscountParameter').and.returnValue(of(errorResult));
    spyOn(toastr, 'error');
    spyOn(router, 'navigate');

    component.completeTask(CompleteTaskEnum.REPROVAR);

    expect(toastr.error).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

  it('should completeTask and throw error', () => {
    spyOn(detailDiscountParameterService, 'completeTaskDiscountParameter').and.returnValue(throwError({ status: 404 }));
    spyOn(toastr, 'error');
    spyOn(router, 'navigate');
    spyOn(modal.getModal('denyModal'), 'close');
    spyOn(modal.getModal('approveModal'), 'close');

    component.completeTask(CompleteTaskEnum.AGUARDANDO_ATIVACAO);

    expect(toastr.error).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(modal.getModal('denyModal').close).toHaveBeenCalled();
    expect(modal.getModal('approveModal').close).toHaveBeenCalled();
  });

  it('should completeTask flex condition and throw error', () => {
    component.tableType = TableTypeEnum.FLEX_CONDITION;
    spyOn(detailFlexConditionService, 'completeTaskFlexCondition').and.returnValue(throwError({ status: 404 }));
    spyOn(toastr, 'error');
    spyOn(router, 'navigate');
    spyOn(modal.getModal('denyModal'), 'close');
    spyOn(modal.getModal('approveModal'), 'close');

    component.completeTask(CompleteTaskEnum.AGUARDANDO_ATIVACAO);

    expect(toastr.error).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(modal.getModal('denyModal').close).toHaveBeenCalled();
    expect(modal.getModal('approveModal').close).toHaveBeenCalled();
  });

  it('should open approve modal', () => {
    spyOn(modal.getModal('approveModal'), 'open');

    component.openModalApprove();
    expect(modal.getModal('approveModal').open).toHaveBeenCalled();
  });

  it('should open deny modal', () => {
    spyOn(modal.getModal('denyModal'), 'open');

    component.openModalDeny();
    expect(modal.getModal('denyModal').open).toHaveBeenCalled();
  });
});
