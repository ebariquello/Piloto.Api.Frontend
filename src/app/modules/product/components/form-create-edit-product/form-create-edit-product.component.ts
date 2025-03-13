import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import {
  FormCreateEditProductModel,
  ProductModel,
} from 'app/core/services/product/product.model';
import { MessagesEnums } from 'app/shared/enums/messages.enum';
import { currencyMask } from 'app/core/helpers/masks.helper';

@Component({
  selector: 'app-form-create-edit-product',
  templateUrl: './form-create-edit-product.component.html',
  styleUrls: ['./form-create-edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateEditProductComponent implements OnInit {
  @Input() productToEdit: ProductModel | null = null; // Input to receive product data for editing
  @Output() formProductEmitter = new EventEmitter<any>();

  formProduct: FormGroup;
  currencyMask = currencyMask;

  get name(): AbstractControl {
    return this.formProduct.get('name');
  }

  get stock(): AbstractControl {
    return this.formProduct.get('stock');
  }

  get price(): AbstractControl {
    return this.formProduct.get('price');
  }

  constructor(private toastr: ToastrService, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildFormProduct(this.fb);
  }

  ngOnChanges() {
    // If productToEdit is passed, update the form values for editing
    if (this.productToEdit) {
      this.formProduct.patchValue({
        ...this.productToEdit,
        price: this.productToEdit.price.toString(),
      });
    }
  }

  addEditProduct(): void {
    const formValue = this.formProduct.getRawValue();
    this.formProduct.markAllAsTouched();

    if (this.formProduct.valid) {
      this.sendProduct(formValue);
    } else {
      this.toastr.warning(MessagesEnums.FORM_INVALID_PENDENCIES);
    }
  }

  getFormProduct(): FormCreateEditProductModel | null {
    if (this.formProduct.valid) {
      return this.formProduct.getRawValue();
    }
    this.toastr.warning(MessagesEnums.FORM_INVALID_PENDENCIES);
    return null;
  }

  private sendProduct(formValue: ProductModel) {
    this.formProductEmitter.emit(formValue as ProductModel);
    this.formProduct.reset();
  }

  private buildFormProduct(fb: FormBuilder): void {
    this.formProduct = fb.group({
      stock: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(99999.99),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }
}
