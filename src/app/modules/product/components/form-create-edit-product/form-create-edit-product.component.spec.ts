import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { IMaskModule } from 'angular-imask';
import { ProductModel } from 'app/core/services/product/product.model';
import { mockServices } from 'app/core/tests/mock-helper.service';
import { MessagesEnums } from 'app/shared/enums/messages.enum';
import { Mock } from 'jasmine-mock-factory-newer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormCreateEditProductComponent } from './form-create-edit-product.component';

describe('FormCreateEditProductComponent', () => {
  let component: FormCreateEditProductComponent;
  let fixture: ComponentFixture<FormCreateEditProductComponent>;

  let toastrServiceMock: Mock<ToastrService>;

  const addOneDay = new Date().getTime() + 86400000;
  const tomorrow = new Date(addOneDay);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateEditProductComponent],
      imports: [ReactiveFormsModule, IMaskModule, ToastrModule.forRoot()],
      providers: [...mockServices([ToastrService])],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateEditProductComponent);
    component = fixture.componentInstance;

    toastrServiceMock = TestBed.get(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the full form', () => {
    component.ngOnInit();

    expect(component.formProduct).toBeTruthy();
  });

  it('should addProduct', () => {
    component.ngOnInit();

    spyOn(component.formProductEmitter, 'emit').and.returnValue();
    spyOn(component.formProduct, 'reset').and.returnValue();

    component.formProduct.get('name').setValue('Product Test');
    component.formProduct.get('price').setValue(1000);
    component.formProduct.get('stock').setValue(2000);

    component.addProduct();

    expect(component.formProductEmitter.emit).toHaveBeenCalledWith({
      name: 'Product Test',
      price: 1000,
      stock: 2000,
    } as ProductModel);

    expect(component.formProduct.reset).toHaveBeenCalled();
  });

  it('should not addProduct if price is minor the 0.1', () => {
    toastrServiceMock._spy.warning._func.and.returnValue('');

    component.ngOnInit();

    component.formProduct.get('name').setValue('Product Test');
    component.formProduct.get('price').setValue(0.1);
    component.formProduct.get('stock').setValue(2000);

    component.addProduct();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      MessagesEnums.FORM_INVALID_PENDENCIES
    );
  });

  it('should not addProduct if form is null', () => {
    toastrServiceMock._spy.warning._func.and.returnValue('');

    component.ngOnInit();

    component.addProduct();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      MessagesEnums.FORM_INVALID_PENDENCIES
    );
  });

  it('should not getFormProduct if form formCreateEditProduct is incomplete', () => {
    toastrServiceMock._spy.warning._func.and.returnValue('');

    component.ngOnInit();

    component.formProduct.get('stock').setValue(3);

    component.getFormProduct();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      MessagesEnums.FORM_INVALID_PENDENCIES
    );
    expect(component.getFormProduct()).toBeNull();
  });
});
