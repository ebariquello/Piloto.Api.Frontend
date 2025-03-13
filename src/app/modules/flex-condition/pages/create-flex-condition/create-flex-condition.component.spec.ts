import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IMaskModule } from 'angular-imask';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import {
  FormCreateFlexConditionComponent
} from 'app/modules/flex-condition/components/form-create-flex-condition/form-create-flex-condition.component';
import { TableModule } from 'app/shared/components/table/table.module';
import { CreateFlexConditionComponent } from './create-flex-condition.component';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';
import { MessagesEnums } from 'app/shared/enums/messages.enum';
import { UserService } from 'app/core/services/login/user.service';

describe('CreateFlexConditionComponent', () => {
  let component: CreateFlexConditionComponent;
  let fixture: ComponentFixture<CreateFlexConditionComponent>;

  let toastrServiceMock: ToastrService;
  let flexConditionService: FlexConditionService;
  let detailFlexConditionService: DetailFlexConditionService;
  let userService: UserService;

  const expectedResponse = {
    'Result': 4,
    'Message': 'O cadastro da Tabela de Condições Mínimas de Flex foi realizado com sucesso',
    'ErrorDetail': null
  };

  const expectedResponseError = {
    'Result': 4,
    'Message': null,
    'ErrorDetail': {
      Title: 'Formulário não foi validado corretamente.',
      Status: 454
    }
  };

  const tableValue = {
    'EffectiveDate': '2020-09-05',
    'EndDate': '2020-12-31',
    'MinimumFlexConditions':
      [
        {
          'PaymentProduct': 1,
          'Modality': 4
        },
        {
          'PaymentProduct': 12,
          'Modality': 10
        },
        {
          'PaymentProduct': 3,
          'Modality': 5
        }
      ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateFlexConditionComponent,
        FormCreateFlexConditionComponent
      ],
      imports: [
        TableModule,
        ReactiveFormsModule,
        IMaskModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        ToastrService,
        FlexConditionService,
        DetailFlexConditionService,
        UserService,
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);

    fixture = TestBed.createComponent(CreateFlexConditionComponent);
    component = fixture.componentInstance;

    toastrServiceMock = TestBed.get(ToastrService);
    flexConditionService = TestBed.get(FlexConditionService);
    detailFlexConditionService = TestBed.get(DetailFlexConditionService);
    userService = TestBed.get(UserService);

    fixture.detectChanges();

    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    userService.userInfo = { Id: '738679', Name: 'Bianca' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addFlex()', () => {
    spyOn(component.tableData$, 'next').and.returnValue();

    const tableFlex = {
      Id: 0,
      PaymentProduct: 5,
      PaymentProductName: 'Name',
      Modality: 5,
      ModalityName: 'Name',
    };

    component.addFlex(tableFlex);

    expect(component.tableData[0]).toEqual(tableFlex);
    expect(component.tableData$.next).toHaveBeenCalledWith([tableFlex]);
  });

  it('should deleteRowItem()', () => {
    spyOn(component.tableData$, 'next').and.returnValue();

    const rowEvent = {
      ActionIndex: 1,
      Row: { Id: 1 }
    };

    const newTable = {
      Id: 0,
      PaymentProduct: 5,
      PaymentProductDesc: 'Name',
      Modality: 5,
      ModalityDesc: 'Name',
    };

    component.tableData = [
      {
        Id: 0,
        PaymentProduct: 5,
        PaymentProductDesc: 'Name',
        Modality: 5,
        ModalityDesc: 'Name',
      },
      {
        Id: 1,
        PaymentProduct: 2,
        PaymentProductDesc: 'Name',
        Modality: 1,
        ModalityDesc: 'Name',
      }
    ];

    component.deleteRowItem(rowEvent);

    expect(component.tableData$.next).toHaveBeenCalledWith([newTable]);
  });

  it('should sendFlexTable successfully', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(of(expectedResponse));
    spyOn(toastrServiceMock, 'success');

    component.tableData = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];
    component.sendFlexTable();

    expect(flexConditionService.addFlexTable).toHaveBeenCalledWith({ ...tableValue, EmployeeFunctionalRegister: '738679' });
    expect(toastrServiceMock.success).toHaveBeenCalledWith(expectedResponse.Message);
  });

  it('should not sendFlexTable if flex form is not empty', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(of(expectedResponse));
    spyOn(toastrServiceMock, 'warning');

    component.formFlexTable.Modality.setValue({ Id: 1, Name: 'Teste' });

    component.tableData = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];
    component.sendFlexTable();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      'Termine de incluir o produto pagamento/modalidade na tabela ou limpe os campos antes de continuar',
      'Formulário inválido');
  });

  it('should not sendFlexTable if flex form is filled', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(of(expectedResponse));
    spyOn(toastrServiceMock, 'warning');

    component.formFlexTable.Modality.setValue({ Id: 1, Name: 'Teste' });
    component.formFlexTable.PaymentProduct.setValue({ Id: 1, Name: 'Teste' });

    component.tableData = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];
    component.sendFlexTable();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      'Termine de incluir o produto pagamento/modalidade na tabela ou limpe os campos antes de continuar',
      'Formulário inválido'
    );
  });

  it('should not sendFlexTable and show warning if MinimumFlexConditions is null', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(of(expectedResponse));
    spyOn(toastrServiceMock, 'warning');

    component.tableData = [];
    component.sendFlexTable();

    expect(flexConditionService.addFlexTable).toHaveBeenCalledTimes(0);
    expect(toastrServiceMock.warning).toHaveBeenCalledWith('Adicione ao menos um item na tabela');
  });

  it('should not sendFlexTable and return an error', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(throwError({ status: 409 }));
    spyOn(toastrServiceMock, 'error');

    component.tableData = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];
    component.sendFlexTable();

    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should not sendFlexTable and display warning', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(of(expectedResponseError));
    spyOn(toastrServiceMock, 'warning');

    component.sendFlexTable();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith('Adicione ao menos um item na tabela');
  });

  it('should sendFlexTable with an error', () => {
    spyOn(component.tableData$, 'next');
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(tableValue);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(of(expectedResponseError));
    spyOn(toastrServiceMock, 'error');

    component.tableData = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];
    component.sendFlexTable();

    expect(component.tableData$.next).toHaveBeenCalledTimes(0);
    expect(toastrServiceMock.error).toHaveBeenCalled();
  });

  it('should not call toastr if tableValue is null', () => {
    spyOn(component.formFlexTable, 'getFormFlex').and.returnValue(null);
    spyOn(flexConditionService, 'addFlexTable').and.returnValue(null);
    spyOn(toastrServiceMock, 'error');
    spyOn(toastrServiceMock, 'success');

    component.tableData = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];
    component.sendFlexTable();

    expect(toastrServiceMock.error).toHaveBeenCalledTimes(0);
    expect(toastrServiceMock.success).toHaveBeenCalledTimes(0);
    expect(flexConditionService.addFlexTable).toHaveBeenCalledTimes(0);
  });

  it('should add items to array if router params have an id', () => {
    const minimumFlexConditions = [
      {
        'PaymentProduct': 1,
        'Modality': 4
      },
      {
        'PaymentProduct': 12,
        'Modality': 10
      },
      {
        'PaymentProduct': 3,
        'Modality': 5
      }
    ];

    spyOn(detailFlexConditionService, 'getDetailsFlexConditionTable').and.returnValue(of({
      Result: {
        'MinimumFlexConditions': minimumFlexConditions
      }
    }));

    spyOn(component.tableData$, 'next').and.returnValue();

    component.ngOnInit();

    expect(detailFlexConditionService.getDetailsFlexConditionTable).toHaveBeenCalledTimes(1);
    expect(component.tableData$.next).toHaveBeenCalledWith(minimumFlexConditions);
  });

  it('should show error if detailDiscountParameterService does not return a result', () => {
    spyOn(detailFlexConditionService, 'getDetailsFlexConditionTable').and.returnValue(throwError({ status: 409 }));
    spyOn(toastrServiceMock, 'error');

    component.ngOnInit();

    expect(toastrServiceMock.error).toHaveBeenCalled();
  });
});
