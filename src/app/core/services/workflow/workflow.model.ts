import { BaseTableModel, BasicResultModel } from 'app/shared/models/base.model';

export class WorkflowResultModel extends BasicResultModel<WorkflowModel[]> { }

export class WorkflowModel extends BaseTableModel {
  constructor(attr: WorkflowModel = {}) {
    super(attr);
  }
}
