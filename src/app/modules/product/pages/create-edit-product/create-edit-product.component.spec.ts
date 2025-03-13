import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IMaskModule } from 'angular-imask';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TableModule } from 'app/shared/components/table/table.module';
import { CreateEditProductComponent } from './create-edit-product.component';
import { ProductService } from 'app/core/services/product/product.service';
import { UserService } from 'app/core/services/login/user.service';
import { FormCreateEditProductComponent } from '../../components/form-create-edit-product/form-create-edit-product.component';

describe('CreateEditProductComponent', () => {
  let component: CreateEditProductComponent;
  let fixture: ComponentFixture<CreateEditProductComponent>;

  let toastrServiceMock: ToastrService;
  let ProductService: ProductService;
  //let detailProductService: DetailProductService;
  let userService: UserService;

  const productValue = {
    name: 'Product Test',
    stock: 1,
    price: 1,
    // productSuppliers: [
    //   {
    //     id: 1,
    //     productId: 1,
    //     supplierId: 1,
    //     supplier: {
    //       id: 1,
    //       name: 'Supplier 1',
    //       cnpj: '123456789',
    //     },
    //   },
    // ],
  };

  const expectedResponse = {
    ...productValue,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateEditProductComponent,
        FormCreateEditProductComponent,
      ],
      imports: [
        TableModule,
        ReactiveFormsModule,
        IMaskModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
      ],
      providers: [
        ToastrService,
        ProductService,
        //UserService,
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);

    fixture = TestBed.createComponent(CreateEditProductComponent);
    component = fixture.componentInstance;

    toastrServiceMock = TestBed.get(ToastrService);
    ProductService = TestBed.get(ProductService);

    userService = TestBed.get(UserService);

    fixture.detectChanges();

    spyOn(component.formProductComponent, 'getFormProduct').and.returnValue(
      productValue
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sendProduct successfully', () => {
    spyOn(component.formProductComponent, 'getFormProduct').and.returnValue(
      productValue
    );
    spyOn(ProductService, 'addProduct').and.returnValue(of(expectedResponse));
    spyOn(toastrServiceMock, 'success');

    component.sendSaveProduct(component.formProductComponent.getFormProduct());

    expect(ProductService.addProduct).toHaveBeenCalledWith(expectedResponse);
    expect(toastrServiceMock.success).toHaveBeenCalledWith(
      'Produto cadastrado com sucesso'
    );
  });

  it('should not sendProduct and return an error', () => {
    spyOn(component.formProductComponent, 'getFormProduct').and.returnValue({
      name: 'Product Test',
      price: 1,
    });
    spyOn(ProductService, 'addProduct').and.returnValue(
      throwError({ status: 409 })
    );
    spyOn(toastrServiceMock, 'error');

    component.sendSaveProduct(component.formProductComponent.getFormProduct());

    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should show warning if formParameters is incomplete', () => {
    spyOn(component.formProductComponent, 'getFormProduct').and.returnValue({
      name: 'Product Test',
      price: 1,
    });
    spyOn(ProductService, 'addProduct').and.returnValue(of(expectedResponse));
    spyOn(toastrServiceMock, 'warning');

    component.formProductComponent.price.setValue('35');

    component.sendSaveProduct(component.formProductComponent.getFormProduct());

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      'Product form wasn´t complete. Finish the editing or clear what´s was filled'
    );
  });
});
