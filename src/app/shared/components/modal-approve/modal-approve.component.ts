import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';

@Component({
  selector: 'app-modal-approve',
  templateUrl: './modal-approve.component.html',
  styleUrls: ['./modal-approve.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalApproveComponent {
  @Output() emitAproveSignal = new EventEmitter<CompleteTaskEnum>();
  @Output() emitCloseModal = new EventEmitter<string>();

  CompleteTaskEnum = CompleteTaskEnum;

  completeTask(action: CompleteTaskEnum): void {
    this.emitAproveSignal.emit(action);
  }

  closeModal(): void {
    this.emitCloseModal.emit('approveModal');
  }
}
