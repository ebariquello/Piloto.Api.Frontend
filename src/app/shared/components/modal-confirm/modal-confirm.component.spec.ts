import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfirmComponent } from './modal-confirm.component';

describe('ModalCOnfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm be called', () => {
    spyOn(component.confirm, 'emit');

    component.onConfirm();
    expect(component.confirm.emit).toHaveBeenCalledWith();
  });

  it('should emitCloseModal in closeModal', () => {
    spyOn(component.cancel, 'emit');

    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
