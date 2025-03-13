
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { DetailFlexConditionModel } from 'app/core/services/detail-flex-condition/detail-flex-condition.model';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';
import { FlexInfoModel } from 'app/core/services/flex-condition/flex-condition.model';
import { TableStatusEnum } from 'app/shared/enums/table-status.enum';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';
import { TableTypeEnum } from 'app/shared/enums/table-type.enum';

@Component({
  templateUrl: './detail-flex-condition.component.html',
  styleUrls: ['./detail-flex-condition.component.scss']
})
export class DetailFlexConditionComponent implements OnInit {

  viewData: DetailFlexConditionModel = {};
  tableData: FlexInfoModel[] = [];
  tableHeaders = [
    'Produto pagamento',
    'Modalidade'
  ];
  tableRows = [
    'PaymentProductDesc',
    'ModalityDesc'
  ];

  TableTypeEnum = TableTypeEnum;

  get tableWaitingApproval(): boolean {
    return this.viewData && this.viewData.Id
      ? this.viewData.ApprovalFlowStatusInt === TableStatusEnum.AGUARDANDO_APROVACAO
      : false;
  }

  get pageTitle(): string {
    return this.tableWaitingApproval
      ? 'Detalhes da solicitação de condições mínimas de flex'
      : 'Detalhes de condições mínimas de flex';
  }

  constructor(
    public location: Location,
    private detailFlexConditionService: DetailFlexConditionService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.getDetailFlexConditionTable(params['id']);
      }
    });
  }

  getDetailFlexConditionTable(tableId: number): void {
    this.detailFlexConditionService.getDetailsFlexConditionTable(tableId).subscribe(
      detailedFlexCondition => {
        checkErrorMessage(this.toastr, detailedFlexCondition.ErrorDetail);

        if (!detailedFlexCondition.ErrorDetail && detailedFlexCondition.Result) {
          this.viewData = new DetailFlexConditionModel(detailedFlexCondition.Result);
          this.viewData.MinimumFlexConditions = [];

          if (detailedFlexCondition.Result.MinimumFlexConditions.length > 0) {
            detailedFlexCondition.Result.MinimumFlexConditions.forEach(
              value => this.viewData.MinimumFlexConditions.push(new FlexInfoModel(value))
            );
          }
        }
      },
      err => this.toastr.error(err)
    );

  }

}
