import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { MessagesEnums } from 'app/shared/enums/messages.enum';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import { FormCreateFlexConditionComponent } from './form-create-flex-condition.component';
import { modalityCallback, productFallback } from 'app/core/helpers/flex-fallback.helper';

describe('FormCreateFlexConditionComponent', () => {
  let component: FormCreateFlexConditionComponent;
  let fixture: ComponentFixture<FormCreateFlexConditionComponent>;

  let toastrServiceMock: ToastrService;
  let flexConditionService: FlexConditionService;

  const addOneDay = new Date().getTime() + 86400000;
  const tomorrow = new Date(addOneDay);

  const selectOptions = { Result: [
    {
      'Id': 1,
      'Name': null
    },
    {
      'Id': 2,
      'Name': 'Visa'
    },
    {
      'Id': 3,
      'Name': 'American Express'
    }
  ]};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreateFlexConditionComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        ToastrService,
        FlexConditionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateFlexConditionComponent);
    component = fixture.componentInstance;

    toastrServiceMock = TestBed.get(ToastrService);
    flexConditionService = TestBed.get(FlexConditionService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getFormFlex()', () => {
    spyOn(toastrServiceMock, 'warning');

    component.formCreateFlex.get('EffectiveDate').setValue(tomorrow);
    component.formFlex.get('PaymentProduct').setValue(2);
    component.formFlex.get('Modality').setValue(2);

    component.modalityOptions = selectOptions.Result;
    component.paymentProductOptions = selectOptions.Result;

    component.addFlexCondition();
    component.getFormFlex();

    expect(toastrServiceMock.warning).toHaveBeenCalledTimes(0);
  });

  it('should show error if form is not complete getFormFlex()', () => {
    spyOn(toastrServiceMock, 'warning');

    component.formFlex.get('PaymentProduct').setValue(2);
    component.formFlex.get('Modality').setValue(null);

    component.getFormFlex();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(MessagesEnums.FORM_INVALID_PENDENCIES);
  });

  it('should not addFlexCondition()', () => {
    spyOn(toastrServiceMock, 'warning');

    component.formCreateFlex.get('EffectiveDate').setValue(tomorrow);
    component.formFlex.get('PaymentProduct').setValue(2);

    component.modalityOptions = selectOptions.Result;
    component.paymentProductOptions = selectOptions.Result;

    component.addFlexCondition();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(MessagesEnums.FORM_INVALID_PENDENCIES);
  });

  it('should call getModality and getPaymentProduct', async () => {
    spyOn(flexConditionService, 'getModality').and.returnValue(of(selectOptions));
    spyOn(flexConditionService, 'getPaymentProduct').and.returnValue(of(selectOptions));

    component.ngOnInit();

    expect(flexConditionService.getPaymentProduct).toHaveBeenCalled();
    expect(component.paymentProductOptions).toEqual(selectOptions.Result);
    // TODO: Verificar por que aqui está retornando 'Rotativo' e não 'MASTERCARD
    expect(component.paymentProductOptions[0].Name).toEqual('Rotativo');

    expect(flexConditionService.getModality).toHaveBeenCalled();
    expect(component.modalityOptions).toEqual(selectOptions.Result);
    expect(component.modalityOptions[0].Name).toEqual('Rotativo');
  });

  it('should call getModality and getPaymentProduct with empty return', async () => {
    const emptyResponse = { Result: [] };
    spyOn(flexConditionService, 'getModality').and.returnValue(of(emptyResponse));
    spyOn(flexConditionService, 'getPaymentProduct').and.returnValue(of(emptyResponse));

    component.ngOnInit();

    expect(flexConditionService.getPaymentProduct).toHaveBeenCalled();
    expect(component.paymentProductOptions).toEqual(productFallback);

    expect(flexConditionService.getModality).toHaveBeenCalled();
    expect(component.modalityOptions).toEqual(modalityCallback);
  });

  it('should throw error with getModality and getPaymentProduct', () => {
    spyOn(toastrServiceMock, 'error');
    spyOn(flexConditionService, 'getModality').and.returnValue(throwError({ status: 409 }));
    spyOn(flexConditionService, 'getPaymentProduct').and.returnValue(throwError({ status: 409 }));

    component.ngOnInit();

    expect(toastrServiceMock.error).toHaveBeenCalledTimes(2);
  });
});
