import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { of } from 'rxjs/internal/observable/of';
import { Mock } from 'jasmine-mock-factory-newer';
import { ListProductComponent } from './list-product.component';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TestSuite } from 'test-suite';
import { mockServices } from 'app/core/tests/mock-helper.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ProductService } from 'app/core/services/product/product.service';

import { ProductModel } from 'app/core/services/product/product.model';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;

  let productService: Mock<ProductService>;
  let routerMock: Mock<Router>;
  let toastrServiceMock: Mock<ToastrService>;

  TestSuite.configure();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductComponent],
      imports: [GridModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        ...mockServices([
          { provide: APP_BASE_HREF },
          HttpClientTestingModule,
          HttpClientModule,
          Router,
          productService,
          ToastrService,
        ]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductComponent);
    component = fixture.componentInstance;
    const get = TestBed.get;
    routerMock = get(Router);
    toastrServiceMock = get(ToastrService);
    productService = get(productService);
    productService._spy.getAllDiscountParameters._func.and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render gridData with 2', () => {
    productService._spy.getAllDiscountParameters._func.and.returnValue(
      of(get2ProductsTables())
    );
    component.ngOnInit();
    expect(component.gridData.length === 2).toBeTruthy();
  });

  it('should call toastr if an error is thrown', () => {
    productService._spy.getAllDiscountParameters._func.and.returnValue(
      throwError({ status: 404 })
    );
    toastrServiceMock._spy.error._func.and.returnValue('');
    component.ngOnInit();
    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should fire click productTableActions', () => {
    productService._spy.getAll._func.and.returnValue(of(get2ProductsTables()));

    component.ngOnInit();
    fixture.detectChanges();

    component.gridActions = [{ title: 'Actions' }];

    spyOn(component, 'productTableActions');

    const myElement = fixture.debugElement.queryAll(By.css('.grid__actions'));
    myElement[0].triggerEventHandler('click', {
      Row: { Id: 4 },
      ActionIndex: 0,
    });

    expect(component.productTableActions).toHaveBeenCalled();
  });

  it('should fire click productTableActions and navigate to Duplicate page', () => {
    component.productTableActions({ Row: { Id: 4 }, ActionIndex: 0 });
    expect(routerMock.navigate).toHaveBeenCalledWith([
      'discount-parameter/duplicate',
      4,
    ]);
  });

  it('should fire click productTableActions and navigate to Duplicate page', () => {
    component.productTableActions({ Row: { Id: 5 }, ActionIndex: 1 });
    expect(routerMock.navigate).toHaveBeenCalledWith([
      'discount-parameter/detail',
      5,
    ]);
  });

  it('should not navigate if row event is null', () => {
    component.productTableActions(null);
    expect(routerMock.navigate).toHaveBeenCalledTimes(0);
  });

  function get2ProductsTables(): ProductModel[] {
    const arr = [
      {
        id: 4,
        name: 'Produto 1',
        stock: 10,
        price: 100,
      },
      {
        id: 3,
        name: 'Produto 1',
        stock: 10,
        price: 100,
      },
    ];
    return arr;
  }
});
