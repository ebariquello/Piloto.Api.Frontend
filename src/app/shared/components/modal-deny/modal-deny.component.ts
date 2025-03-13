import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';

@Component({
  selector: 'app-modal-deny',
  templateUrl: './modal-deny.component.html',
  styleUrls: ['./modal-deny.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDenyComponent {

  @Output() emitDenySignal = new EventEmitter<CompleteTaskEnum>();
  @Output() emitCloseModal = new EventEmitter<string>();

  CompleteTaskEnum = CompleteTaskEnum;

  completeTask(action: CompleteTaskEnum): void {
    this.emitDenySignal.emit(action);
  }

  closeModal(): void {
    this.emitCloseModal.emit('denyModal');
  }

}
