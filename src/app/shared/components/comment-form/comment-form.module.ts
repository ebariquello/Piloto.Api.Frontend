import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommentFormComponent } from './comment-form.component';
import { ModalDenyModule } from 'app/shared/components/modal-deny/modal-deny.module';
import { ModalApproveModule } from 'app/shared/components/modal-approve/modal-approve.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
  declarations: [CommentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalDenyModule,
    ModalApproveModule,
    NgxSmartModalModule.forChild()
  ],
  exports: [CommentFormComponent]
})
export class CommentFormModule { }
