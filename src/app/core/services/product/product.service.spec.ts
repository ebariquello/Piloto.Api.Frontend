import { TestBed, async } from '@angular/core/testing';
import { ProductService } from './product.service';
import { TestSuite } from 'test-suite';
import { HttpClient } from '@angular/common/http';
import { Mock, MockFactory } from 'jasmine-mock-factory-newer';
import { of } from 'rxjs';
import { environment } from 'environments/environment';

describe('ProductService', () => {
  let httpClientMock: Mock<HttpClient>;
  let productService: ProductService;

  TestSuite.configure();

  beforeEach(() => {
    httpClientMock = MockFactory.create(HttpClient);
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [{ provide: HttpClient, useFactory: () => httpClientMock }],
    }).compileComponents();

    productService = new ProductService(httpClientMock);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should getAll()', (done) => {
    const expectedReturn = [
      {
        id: 1,
        name: 'Product 1',
        stock: 10,
        price: 100,
      },
      {
        id: 2,
        name: 'Product 2',
        stock: 20,
        price: 200,
      },
    ];

    httpClientMock._spy.get._func.and.returnValue(of(expectedReturn));

    productService.getAll().subscribe(
      (res) => {
        const expectedURL = `${environment.products}`;
        expect(httpClientMock.get).toHaveBeenCalledWith(expectedURL);
        expect(httpClientMock.get).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expectedReturn);
        done();
      },
      () => {
        fail();
        done();
      }
    );
  });

  it('should addProduct()', (done) => {
    const body = {
      name: 'Product 1',
      stock: 10,
      price: 100,
    };

    const expectedReturn = {
      id: 1,
      name: 'Product 1',
      stock: 10,
      price: 100,
    };

    httpClientMock._spy.post._func.and.returnValue(of(expectedReturn));

    productService.addProduct(body).subscribe(
      (res) => {
        const expectedURL = `${environment.parameters.addParameter}`;
        expect(httpClientMock.post).toHaveBeenCalledWith(expectedURL, body);
        expect(httpClientMock.post).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expectedReturn);
        done();
      },
      () => {
        fail();
        done();
      }
    );
  });
});
