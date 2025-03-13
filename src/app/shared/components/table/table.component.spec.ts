import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs/internal/observable/of';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockValue = {
    terminal: 34324,
    faturamento: 34324,
    faturamentoFinal: 34324
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.tableHeaders = ['Terminais', ' Faturamento inicial', 'Faturamento final'];
    component.tableRows = ['terminal', 'faturamento', 'faturamentoFinal'];
    component.tableActions = [{ iconName: 'Apagar', iconTitle: 'Apagar' }];
    component.tableData$ = of([
      {
        terminal: 45,
        faturamento: 45,
        faturamentoFinal: 45
      },
      {
        terminal: 34324,
        faturamento: 34324,
        faturamentoFinal: 34324
      }
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should trigger click on action and emit value', () => {
    spyOn(component, 'sendAction');
    fixture.debugElement.queryAll(By.css('.table-cc__actions span'))[1].triggerEventHandler('click', null);
    expect(component.sendAction).toHaveBeenCalledWith(mockValue, 0);
  });

  it('should emit value when called', () => {
    spyOn(component.sendActionEmitter, 'emit');
    component.sendAction(mockValue, 0);
    expect(component.sendActionEmitter.emit).toHaveBeenCalledWith(
      { Row: mockValue, ActionIndex: 0 }
    );
  });
});
