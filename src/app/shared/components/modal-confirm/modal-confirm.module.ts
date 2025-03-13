import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmComponent } from 'app/shared/components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [CommonModule],
  exports: [ModalConfirmComponent],
})
export class ModalConfirmModule {}
