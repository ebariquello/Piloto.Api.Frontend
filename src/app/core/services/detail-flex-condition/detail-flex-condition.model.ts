import { FlexInfoModel } from 'app/core/services/flex-condition/flex-condition.model';
import { BaseTableModel, BasicResultModel } from 'app/shared/models/base.model';


export class DetailBaseResultModel extends BasicResultModel<DetailFlexConditionModel> { }

export class DetailFlexConditionModel extends BaseTableModel {
  MinimumFlexConditions?: FlexInfoModel[];

  constructor(attr: BaseTableModel = {}) {
    super(attr);
  }
}
