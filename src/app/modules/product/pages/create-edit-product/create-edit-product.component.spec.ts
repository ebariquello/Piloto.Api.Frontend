import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IMaskModule } from 'angular-imask';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TableModule } from 'app/shared/components/table/table.module';
import { CreateEditProductComponent } from './create-edit-product.component';
import { ProductService } from 'app/core/services/product/product.service';

import { FormCreateEditProductComponent } from '../../components/form-create-edit-product/form-create-edit-product.component';

import { APP_BASE_HREF } from '@angular/common';
import { ListProductComponent } from '../list-product/list-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'app/modules/home/pages/home/home.component';
import { ProductModel } from 'app/core/services/product/product.model';
describe('CreateEditProductComponent', () => {
  let component: CreateEditProductComponent;
  let fixture: ComponentFixture<CreateEditProductComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: any;

  const productValue = {
    name: 'Product Test',
    stock: 1,
    price: 1,
  };

  const expectedResponse = {
    ...productValue,
  };

  beforeEach(async(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    productServiceMock = jasmine.createSpyObj('ProductService', [
      'addProduct',
      'updateProduct',
      'getById',
    ]);

    toastrServiceMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'warning',
    ]);
  }));

  it('should be created', () => {
    activatedRouteMock = { params: of({}) };
    TestBed.configureTestingModule({
      declarations: [
        CreateEditProductComponent,
        FormCreateEditProductComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        IMaskModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ProductService, useValue: productServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should call addProduct when creating a new product', () => {
    activatedRouteMock = { params: of({}) };
    TestBed.configureTestingModule({
      declarations: [
        CreateEditProductComponent,
        FormCreateEditProductComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        IMaskModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ProductService, useValue: productServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productServiceMock.addProduct.and.returnValue(of(expectedResponse));

    component.sendSaveProduct(productValue);

    expect(productServiceMock.addProduct).toHaveBeenCalledWith(productValue);
  });

  it('should call updateProduct when editing a product', fakeAsync(() => {
    // Mock ActivatedRoute for editing (with `id` in params)
    const activatedRouteMock = { params: of({ id: 1 }) };

    // TestBed configuration
    TestBed.configureTestingModule({
      declarations: [
        CreateEditProductComponent,
        FormCreateEditProductComponent,
        HomeComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '/products', component: HomeComponent }, // Define your route
        ]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        IMaskModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ProductService, useValue: productServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditProductComponent);
    component = fixture.componentInstance;

    // Mock the response for getting product details (productToUpdate)
    productServiceMock.getById.and.returnValue(
      of({
        name: 'Product Test',
        stock: 1,
        price: 1,
        id: 1,
      })
    );

    // Trigger ngOnInit (initialize the form and populate it)
    fixture.detectChanges();
    tick(); // flush any pending asynchronous operations

    // Check if form is initialized
    expect(component.formProductComponent).toBeTruthy(); // Make sure the form is initialized
    spyOn(
      component.formProductComponent.formProductEmitter,
      'emit'
    ).and.returnValue();
    // Ensure the form is populated with the returned product details
    component.formProductComponent.formProduct
      .get('name')
      .setValue('Product Test');
    component.formProductComponent.formProduct.get('price').setValue('1000');
    component.formProductComponent.formProduct.get('stock').setValue(2000);

    component.formProductComponent.addEditProduct();

    expect(
      component.formProductComponent.formProductEmitter.emit
    ).toHaveBeenCalledWith({
      name: 'Product Test',
      price: '1000',
      stock: 2000,
    });

    // Mock the service call for updating the product
    productServiceMock.updateProduct.and.returnValue(
      of({
        name: 'Product Test',
        price: 1000,
        stock: 2000,
        id: 1,
      })
    );

    // Call sendSaveProduct to trigger the update process
    component.sendSaveProduct({
      name: 'Product Test',
      price: 1000,
      stock: 2000,
    });

    // Ensure the updateProduct method was called with the correct parameters
    expect(productServiceMock.updateProduct).toHaveBeenCalledWith({
      name: 'Product Test',
      price: 1000,
      stock: 2000,
      id: 1,
    });

    // Check that toastr success was called
    expect(toastrServiceMock.success).toHaveBeenCalledWith(
      'Product updated successfully'
    );
  }));
});
