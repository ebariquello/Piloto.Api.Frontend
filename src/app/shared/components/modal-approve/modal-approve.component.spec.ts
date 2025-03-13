import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';

import { ModalApproveComponent } from './modal-approve.component';

describe('ModalApproveComponent', () => {
  let component: ModalApproveComponent;
  let fixture: ComponentFixture<ModalApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emitAproveSignal in completeTask', () => {
    spyOn(component.emitAproveSignal, 'emit');

    component.completeTask(CompleteTaskEnum.AGUARDANDO_ATIVACAO);
    expect(component.emitAproveSignal.emit).toHaveBeenCalledWith(CompleteTaskEnum.AGUARDANDO_ATIVACAO);
  });

  it('should emitCloseModal in closeModal', () => {
    spyOn(component.emitCloseModal, 'emit');

    component.closeModal();
    expect(component.emitCloseModal.emit).toHaveBeenCalled();
  });
});
