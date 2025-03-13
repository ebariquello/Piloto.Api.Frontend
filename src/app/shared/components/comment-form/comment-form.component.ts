import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
// import { DetailDiscountParameterService } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';
import { TableTypeEnum } from 'app/shared/enums/table-type.enum';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit {
  /**
   * Required
   */
  @Input() tableId: number;
  @Input() tableType: TableTypeEnum;

  formComment: FormGroup;

  CompleteTaskEnum = CompleteTaskEnum;

  get commentValue(): string | null {
    return this.formComment.get('Comment').value;
  }

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    // private detailDiscountParameterService: DetailDiscountParameterService,
    private detailFlexConditionService: DetailFlexConditionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  completeTask(action: CompleteTaskEnum): void {
    if (action === CompleteTaskEnum.REPROVAR && !this.commentValue) {
      this.closeModal('denyModal');
      this.toastr.error('Adicione um comentário para recusar essa solicitação');
    } else {
      if (this.tableType === TableTypeEnum.DISCOUNT_PARAMETER) {
        this.completeTaskDiscountParameter(action);
      } else {
        this.completeTaskFlexConditions(action);
      }
    }
  }

  openModalApprove(): void {
    this.ngxSmartModalService.getModal('approveModal').open();
  }

  openModalDeny(): void {
    this.ngxSmartModalService.getModal('denyModal').open();
  }

  closeModal(modalName: string): void {
    this.ngxSmartModalService.getModal(modalName).close();
  }

  private buildForm(): void {
    this.formComment = new FormGroup({
      Comment: new FormControl(null),
    });
  }

  private completeTaskDiscountParameter(action: CompleteTaskEnum) {
    // this.detailDiscountParameterService
    //   .completeTaskDiscountParameter(this.tableId, this.commentValue, action)
    //   .pipe(finalize(() => this.closeModals()))
    //   .subscribe(
    //     (result) => {
    //       checkErrorMessage(this.toastr, result.ErrorDetail);
    //       if (!result.ErrorDetail) {
    //         this.router.navigate(['/workflow']);
    //         this.toastr.success(result.Message);
    //       }
    //     },
    //     (err) => this.toastr.error(err)
    //   );
  }

  private completeTaskFlexConditions(action: CompleteTaskEnum) {
    this.detailFlexConditionService
      .completeTaskFlexCondition(this.tableId, this.commentValue, action)
      .pipe(finalize(() => this.closeModals()))
      .subscribe(
        (result) => {
          checkErrorMessage(this.toastr, result.ErrorDetail);

          if (!result.ErrorDetail) {
            this.router.navigate(['/workflow']);
            this.toastr.success(result.Message);
          }
        },
        (err) => this.toastr.error(err)
      );
  }

  private closeModals(): void {
    this.closeModal('denyModal');
    this.closeModal('approveModal');
  }
}
