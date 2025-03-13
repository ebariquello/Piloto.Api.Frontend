import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { percentageMask, currencyMask } from 'app/core/helpers/masks.helper';
import { minDateTomorrowValidator } from 'app/core/helpers/validators.helper';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import { FlexInfoModel, FlexSelectModel, FormFlexConditionModel } from 'app/core/services/flex-condition/flex-condition.model';
import { MessagesEnums } from 'app/shared/enums/messages.enum';
import { modalityCallback, productFallback } from 'app/core/helpers/flex-fallback.helper';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';

@Component({
  selector: 'app-form-create-flex-condition',
  templateUrl: './form-create-flex-condition.component.html',
  styleUrls: ['./form-create-flex-condition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCreateFlexConditionComponent implements OnInit {

  @Output() formFlexEmitter = new EventEmitter<any>();

  formCreateFlex: FormGroup;
  formFlex: FormGroup;

  percentageMask = percentageMask;
  currencyMask = currencyMask;

  modalityOptions: FlexSelectModel[] = [];
  paymentProductOptions: FlexSelectModel[] = [];

  get EffectiveDate(): AbstractControl {
    return this.formCreateFlex.get('EffectiveDate');
  }

  get PaymentProduct(): AbstractControl {
    return this.formFlex.get('PaymentProduct');
  }

  get Modality(): AbstractControl {
    return this.formFlex.get('Modality');
  }

  constructor(
    private toastr: ToastrService,
    private flexConditionService: FlexConditionService,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildFormCreateFlex();
    this.buildFormFlex();
    this.buildSelectsFlex();
  }

  addFlexCondition(): void {
    const formValue = this.formFlex.getRawValue();
    this.formFlex.markAllAsTouched();

    if (this.PaymentProduct.value && this.Modality.value) {
      this.sendFlexCondition(formValue);
    } else {
      this.toastr.warning(MessagesEnums.FORM_INVALID_PENDENCIES);
    }
  }

  getFormFlex(): FormFlexConditionModel {
    if (this.formCreateFlex.valid) {
      return this.formCreateFlex.getRawValue();
    }
    this.toastr.warning(MessagesEnums.FORM_INVALID_PENDENCIES);
  }

  private sendFlexCondition(formValue: FlexInfoModel) {
    const minimumFlexConditions = this.formCreateFlex.get('MinimumFlexConditions') as FormArray;
    const formBuilder = new FlexInfoModel(formValue);

    minimumFlexConditions.push(new FormControl(formValue));
    this.formFlexEmitter.emit({
      ...formBuilder,
      PaymentProductDesc: this.getPaymentProductName(formBuilder.PaymentProduct),
      ModalityDesc: this.getModalityName(formBuilder.Modality)
    });

    this.resetForm();
  }

  private buildFormCreateFlex(): void {
    this.formCreateFlex = new FormGroup({
      EffectiveDate: new FormControl(null, [Validators.required, minDateTomorrowValidator]),
      MinimumFlexConditions: new FormArray([], Validators.required),
    });
  }

  private buildFormFlex(): void {
    this.formFlex = new FormGroup({
      PaymentProduct: new FormControl('', Validators.required),
      Modality: new FormControl('', Validators.required)
    });
  }

  private buildSelectsFlex(): void {
    this.flexConditionService.getModality().subscribe(
      res => {
        checkErrorMessage(this.toastr, res.ErrorDetail);

        if (!res.ErrorDetail) {
          this.modalityOptions = res.Result ? this.modalityOptions.concat(res.Result) : null;
          this.fallbackModalityOptions();
        }
      },
      err => this.toastr.error(err)
    );

    this.flexConditionService.getPaymentProduct().subscribe(
      res => {
        checkErrorMessage(this.toastr, res.ErrorDetail);

        if (!res.ErrorDetail) {
          this.paymentProductOptions = res.Result ? this.paymentProductOptions.concat(res.Result) : null;
          this.fallbackPaymentProductOptions();
        }
      },
      err => this.toastr.error(err)
    );
  }

  /**
   * Used only EVERYTHING goes wrong and payment product options is incomplete or never came
   */
  private fallbackPaymentProductOptions(): void {
    if (this.paymentProductOptions && this.paymentProductOptions.length > 0) {
      this.paymentProductOptions.forEach(
        paymentProduct => {
          if (!paymentProduct.Name) {
            paymentProduct.Name = (productFallback.find(option => option.Id === paymentProduct.Id)).Name;
          }
        }
      );
    }

    if (this.paymentProductOptions.length <= 0) {
      this.paymentProductOptions = productFallback;
    }

    this.changeDetection.detectChanges();
  }

  /**
   * Used only EVERYTHING goes wrong and modality options is incomplete or never came
   */
  private fallbackModalityOptions(): void {
    if (this.modalityOptions && this.modalityOptions.length > 0) {
      this.modalityOptions.forEach(
        modality => {
          if (!modality.Name) {
            modality.Name = (modalityCallback.find(option => option.Id === modality.Id)).Name;
          }
        }
      );
    }

    if (this.modalityOptions.length <= 0) {
      this.modalityOptions = modalityCallback;
    }

    this.changeDetection.detectChanges();
  }

  private resetForm(): void {
    this.formFlex.reset();
    this.Modality.setValue('');
    this.PaymentProduct.setValue('');
  }

  // TODO: Check if these two methods still are valid
  private getPaymentProductName(paymentProductId: number): string {
    return this.paymentProductOptions.find(value => value.Id === paymentProductId).Name;
  }

  private getModalityName(modalityId: number): string {
    return this.modalityOptions.find(value => value.Id === modalityId).Name;
  }

}
