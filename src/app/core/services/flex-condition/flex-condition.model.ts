import { BaseTableModel, BasicResultModel } from 'app/shared/models/base.model';

export class FlexConditionResultModel extends BasicResultModel<FlexConditionModel[]> { }

export class FlexSelectResultModel extends BasicResultModel<FlexSelectModel[]> { }

export class FlexConditionModel extends BaseTableModel {
  MinimumFlexConditions?: FlexInfoModel[] = [];
}

export class FlexInfoModel {
  Id?: number;
  PaymentProduct?: number;
  PaymentProductDesc?: string;
  Modality?: number;
  ModalityDesc?: string;

  constructor(attr: FlexInfoModel = {}) {
    this.Id = attr.Id;
    this.PaymentProduct = Number(attr.PaymentProduct);
    this.PaymentProductDesc = attr.PaymentProductDesc;
    this.Modality = Number(attr.Modality);
    this.ModalityDesc = attr.ModalityDesc;
  }
}

export class FormFlexConditionModel {
  EffectiveDate?: string;
  EmployeeFunctionalRegister?: string;
  MinimumFlexConditions?: FlexInfoModel[];
}

export class FlexSelectModel {
  Id?: number;
  Name?: string;
}
