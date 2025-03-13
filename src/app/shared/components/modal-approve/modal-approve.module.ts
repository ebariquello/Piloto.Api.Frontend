import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalApproveComponent } from 'app/shared/components/modal-approve/modal-approve.component';

@NgModule({
  declarations: [
    ModalApproveComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalApproveComponent
  ]
})
export class ModalApproveModule { }
