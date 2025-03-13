// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';

// import { ToastrService } from 'ngx-toastr';
// import { DetailDiscountParameterService } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.service';
// import { DetailDiscountParameterModel } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.model';
// import { TableStatusEnum } from 'app/shared/enums/table-status.enum';
// import { ParameterInfoModel } from 'app/core/services/product/product.model';
// import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';
// import { TableTypeEnum } from 'app/shared/enums/table-type.enum';

// @Component({
//   templateUrl: './detail-discount-parameter.component.html',
//   styleUrls: ['./detail-discount-parameter.component.scss'],
// })
// export class DetailDiscountParameterComponent implements OnInit {
//   viewData: DetailDiscountParameterModel = {};
//   tableData: DetailDiscountParameterModel[] = [];
//   tableHeaders = [
//     'Terminais',
//     'Faturamento inicial',
//     'Faturamento final',
//     '(%) desconto com flex',
//     '(%) desconto sem flex',
//   ];
//   tableRows = [
//     'Terminals',
//     'InitialBilling',
//     'FinalBilling',
//     'DiscountWithFlex',
//     'DiscountWithoutFlex',
//   ];

//   TableTypeEnum = TableTypeEnum;

//   get tableWaitingApproval(): boolean {
//     return this.viewData && this.viewData.Id
//       ? this.viewData.ApprovalFlowStatusInt ===
//           TableStatusEnum.AGUARDANDO_APROVACAO
//       : false;
//   }

//   get pageTitle(): string {
//     return this.tableWaitingApproval
//       ? 'Detalhes da solicitação de parâmetros de desconto'
//       : 'Detalhes de parâmetros de desconto';
//   }

//   constructor(
//     public location: Location,
//     private detailDiscountParameterService: DetailDiscountParameterService,
//     private toastr: ToastrService,
//     private activeRoute: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.activeRoute.params.subscribe((params) => {
//       if (params['id']) {
//         this.getDetailDiscountParameterTable(params['id']);
//       }
//     });
//   }

//   getDetailDiscountParameterTable(tableId: number): void {
//     this.detailDiscountParameterService
//       .getDetailsDiscountParameterTable(tableId)
//       .subscribe(
//         (detailedDiscountParameter) => {
//           checkErrorMessage(this.toastr, detailedDiscountParameter.ErrorDetail);

//           if (
//             !detailedDiscountParameter.ErrorDetail &&
//             detailedDiscountParameter.Result
//           ) {
//             this.viewData = new DetailDiscountParameterModel(
//               detailedDiscountParameter.Result
//             );
//             this.viewData.DiscountParameters = [];

//             if (
//               detailedDiscountParameter.Result.DiscountParameters.length > 0
//             ) {
//               detailedDiscountParameter.Result.DiscountParameters.forEach(
//                 (value) =>
//                   this.viewData.DiscountParameters.push(
//                     new ParameterInfoModel(value)
//                   )
//               );
//             }
//           }
//         },
//         (err) => this.toastr.error(err)
//       );
//   }
// }
