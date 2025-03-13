import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { finalize } from 'rxjs/operators';
import { BaseRowEventModel } from 'app/shared/models/base.model';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import { FlexConditionModel } from 'app/core/services/flex-condition/flex-condition.model';
import { WorkflowModel } from 'app/core/services/workflow/workflow.model';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';

@Component({
  selector: 'app-flex-condition',
  templateUrl: './flex-condition.component.html',
  styleUrls: ['./flex-condition.component.scss']
})
export class FlexConditionComponent implements OnInit {

  gridHeaders = ['Vigente', 'Criado em', 'Início de vigência', 'Fim de vigência', 'Status', 'Aprovado em', 'Versão'];
  gridRows = ['ActiveDesc', 'RegisterDate', 'EffectiveDate', 'EndDate', 'ApprovalFlowStatusDescription', 'ApprovalDate', 'Id'];
  gridActions = ['duplicar', 'Ver detalhes'];

  gridData: WorkflowModel[] = [];
  gridData$ = new Subject<WorkflowModel[]>();

  gridLoading: (boolean) = false;

  constructor(
    private flexConditionService: FlexConditionService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFlexConditionTables();
  }

  flexConditionTableActions(event: BaseRowEventModel) {
    if (event) {
      if (event.ActionIndex === 0) {
        this.router.navigate(['flex-condition/duplicate', event.Row.Id]);
      } else {
        this.router.navigate(['flex-condition/detail', event.Row.Id]);
      }
    }
  }

  getFlexConditionTables(): void {
    this.gridLoading = true;

    this.flexConditionService.getAllFlexConditions()
      .pipe(finalize(() => this.gridLoading = false))
      .subscribe(
        conditions => {
          checkErrorMessage(this.toastr, conditions.ErrorDetail);

          if (!conditions.ErrorDetail && conditions.Result) {
            conditions.Result.forEach(condition => this.gridData.push(new FlexConditionModel(condition)));
            this.gridData$.next(this.gridData);
          }
        },
        err => this.toastr.error(err));
  }

}
