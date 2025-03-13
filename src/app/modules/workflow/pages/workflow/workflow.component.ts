import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/internal/Subject';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { WorkflowService } from 'app/core/services/workflow/workflow.service';
import { WorkflowModel } from 'app/core/services/workflow/workflow.model';
import { BaseRowEventModel } from 'app/shared/models/base.model';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  gridHeaders = ['Tipo de solicitação', 'Criado em', 'Início de vigência', 'Status', 'Versão'];
  gridRowsSubmitted = ['OriginSubmittedApproval', 'RegisterDate', 'EffectiveDate', 'ApprovalFlowStatusDescription', 'Id'];
  gridRowsPending = ['OriginPendingApproval', 'RegisterDate', 'EffectiveDate', 'ApprovalFlowStatusDescription', 'Id'];
  gridActions = ['Ver detalhes'];

  gridDataPending: WorkflowModel[] = [];
  gridDataSubmitted: WorkflowModel[] = [];

  gridDataPending$ = new Subject<WorkflowModel[]>();
  gridDataSubmitted$ = new Subject<WorkflowModel[]>();

  pendingLoading: (boolean) = false;
  submittedLoading: (boolean) = false;

  constructor(
    private workflowService: WorkflowService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPending();
    this.getSubmitted();
  }

  detailsPendency(event: BaseRowEventModel) {
    if (event.Row.OriginSubmittedApproval === 'Parâmetros de Desconto' || event.Row.OriginPendingApproval === 'Parâmetros de Desconto') {
      this.router.navigate(['discount-parameter/detail', event.Row.Id]);
    } else {
      this.router.navigate(['flex-condition/detail', event.Row.Id]);
    }
  }

  getPending(): void {
    this.pendingLoading = true;

    this.workflowService.getWorkflowPending()
      .pipe(finalize(() => this.pendingLoading = false))
      .subscribe(
        workflows => {
          checkErrorMessage(this.toastr, workflows.ErrorDetail);

          if (!workflows.ErrorDetail && workflows.Result && workflows.Result.length > 0) {
            workflows.Result.forEach(workflow => {
              this.gridDataPending.push(new WorkflowModel(workflow));
              this.gridDataPending$.next(this.gridDataPending);
            });
          }
        },
        err => this.toastr.error(err));
  }

  getSubmitted(): void {
    this.submittedLoading = true;

    this.workflowService.getWorkflowSubmitted()
      .pipe(finalize(() => this.submittedLoading = false))
      .subscribe(
        workflows => {
          checkErrorMessage(this.toastr, workflows.ErrorDetail);

          if (!workflows.ErrorDetail && workflows.Result && workflows.Result.length > 0) {
            workflows.Result.forEach(workflow => {
              this.gridDataSubmitted.push(new WorkflowModel(workflow));
              this.gridDataSubmitted$.next(this.gridDataSubmitted);
            });
          }
        },
        err => this.toastr.error(err));
  }

}
