import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { FormCreateFlexConditionComponent } from 'app/modules/flex-condition/components/form-create-flex-condition/form-create-flex-condition.component';
import { BaseRowEventModel } from 'app/shared/models/base.model';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import {
  FlexInfoModel,
  FormFlexConditionModel,
} from 'app/core/services/flex-condition/flex-condition.model';
import { MessagesEnums } from 'app/shared/enums/messages.enum';
import { DetailFlexConditionService } from 'app/core/services/detail-flex-condition/detail-flex-condition.service';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';
import { UserService } from 'app/core/services/login/user.service';

@Component({
  templateUrl: './create-flex-condition.component.html',
  styleUrls: ['./create-flex-condition.component.scss'],
})
export class CreateFlexConditionComponent implements OnInit {
  @ViewChild(FormCreateFlexConditionComponent, { static: true })
  formFlexTable!: FormCreateFlexConditionComponent;

  hasParamId: boolean = false;

  tableData: FlexInfoModel[] = [];
  tableData$ = new Subject<FlexInfoModel[]>();
  tableHeaders = ['Produto pagamento', 'Modalidade'];
  tableRows = ['PaymentProductDesc', 'ModalityDesc'];
  tableActions = [{ iconName: 'icon_excluir', iconTitle: 'Excluir' }];

  constructor(
    public flexConditionService: FlexConditionService,
    public location: Location,
    private detailFlexConditionService: DetailFlexConditionService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.hasParamId = true;
        this.getDetailFlexConditionTable(params['id']);
      }
    });
  }

  addFlex(flexTable: FlexInfoModel): void {
    this.tableData.push({
      ...flexTable,
      Id: this.tableData.length,
    });
    this.tableData$.next(this.tableData);
  }

  sendFlexTable(): void {
    if (!this.checkFormFlexFilled()) {
      const tableValue = this.formFlexTable.getFormFlex();

      if (tableValue) {
        tableValue.MinimumFlexConditions = [];
        tableValue.MinimumFlexConditions = this.tableData;

        if (tableValue.MinimumFlexConditions.length > 0) {
          this.addFlexTable({
            ...tableValue,
            EmployeeFunctionalRegister:
              this.userService.currentUserInformation.id,
          });
        } else {
          this.toastr.warning('Adicione ao menos um item na tabela');
        }
      } else {
        this.toastr.warning(MessagesEnums.FORM_INVALID_PENDENCIES);
      }
    }
  }

  deleteRowItem(event: BaseRowEventModel) {
    this.tableData = this.tableData.filter((data) => data.Id !== event.Row.Id);
    this.tableData$.next(this.tableData);
  }

  private addFlexTable(tableValue: FormFlexConditionModel): void {
    this.flexConditionService.addFlexTable(tableValue).subscribe(
      (res) => {
        checkErrorMessage(this.toastr, res.ErrorDetail);

        if (!res.ErrorDetail) {
          this.router.navigate(['/workflow']);
          this.toastr.success(res.Message);
        }
      },
      (err) => this.toastr.error(err)
    );
  }

  private checkFormFlexFilled(): boolean {
    if (
      this.formFlexTable.PaymentProduct.value ||
      this.formFlexTable.Modality.value
    ) {
      this.toastr.warning(
        'Termine de incluir o produto pagamento/modalidade na tabela ou limpe os campos antes de continuar',
        'Formulário inválido'
      );
      return true;
    }
    return false;
  }

  private getDetailFlexConditionTable(tableId: number): void {
    this.detailFlexConditionService
      .getDetailsFlexConditionTable(tableId)
      .subscribe(
        (res) => {
          checkErrorMessage(this.toastr, res.ErrorDetail);

          if (
            !res.ErrorDetail &&
            res.Result &&
            res.Result.MinimumFlexConditions.length > 0
          ) {
            this.tableData = res.Result.MinimumFlexConditions;
            this.tableData$.next(this.tableData);
          }
        },
        (err) => this.toastr.error(err)
      );
  }
}
