import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';

import { ModalDenyComponent } from './modal-deny.component';

describe('ModalDenyComponent', () => {
  let component: ModalDenyComponent;
  let fixture: ComponentFixture<ModalDenyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDenyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emitAproveSignal in completeTask', () => {
    spyOn(component.emitDenySignal, 'emit');

    component.completeTask(CompleteTaskEnum.REPROVAR);
    expect(component.emitDenySignal.emit).toHaveBeenCalledWith(CompleteTaskEnum.REPROVAR);
  });

  it('should emitCloseModal in closeModal', () => {
    spyOn(component.emitCloseModal, 'emit');

    component.closeModal();
    expect(component.emitCloseModal.emit).toHaveBeenCalled();
  });
});
