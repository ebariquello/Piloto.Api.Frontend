import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GridComponent } from './grid.component';
import {
  BaseRowEventModel,
  BaseTableModel,
} from 'app/shared/models/base.model';

describe('GridComponent', () => {
  let component: GridComponent<BaseTableModel>;
  let fixture: ComponentFixture<GridComponent<BaseTableModel>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;

    component.gridTitle = 'Teste';
    component.gridHeaders = ['Tipo de solicitação', 'Criado em'];
    component.gridRows = ['Type', 'RegisterDate'];
    component.gridActions = [{ title: 'Ver detalhes' }];
    component.gridData = [
      {
        Id: 21,
        OriginSubmittedApproval: 'Teste 1',
        RegisterDate: '30/12/2020',
      },
      {
        Id: 31,
        OriginSubmittedApproval: 'Teste 2',
        RegisterDate: '30/12/2020',
      },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendAction() value when clicked and send id = 21', () => {
    spyOn(component, 'sendAction');
    fixture.debugElement
      .queryAll(By.css('.grid__actions'))[0]
      .triggerEventHandler('click', null);
    expect(component.sendAction).toHaveBeenCalledWith(
      {
        Id: 21,
        OriginSubmittedApproval: 'Teste 1',
        RegisterDate: '30/12/2020',
      },
      0
    );
  });

  it('should emit value when called', () => {
    spyOn(component.sendActionEmitter, 'emit');
    component.sendAction(
      {
        Id: 31,
        OriginSubmittedApproval: 'Teste 2',
        RegisterDate: '30/12/2020',
      },
      1
    );
    expect(component.sendActionEmitter.emit).toHaveBeenCalled();
  });
});
