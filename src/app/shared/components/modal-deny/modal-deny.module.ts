import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDenyComponent } from 'app/shared/components/modal-deny/modal-deny.component';

@NgModule({
  declarations: [
    ModalDenyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalDenyComponent
  ]
})
export class ModalDenyModule { }
