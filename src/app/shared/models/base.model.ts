import { formatDate, formateDateWithHour } from 'app/core/helpers/formatted-dates.helper';

/**
 * Every endpoint returns in BasicResultModel format as default.
 * Extends this class to use it.
 * T is a generic class, replace with the model that will return in Result.
 */
export class BasicResultModel<T> {
  Result?: T;
  Message?: string;
  ErrorDetail?: ErrorDetailModel;
}

/**
 * Error detail contract
 */
export class ErrorDetailModel {
  Status?: number;
  Title?: string;
  Details?: NotificationModel[];
}

export class NotificationModel {
  Property?: string;
  Message?: string;
}

/**
 * Base result model for most tables in the system
 * @extends BasicResultModel
 */
export class BaseResultModel extends BasicResultModel<BaseTableModel[]> { }

/**
 * Result is a number.
 * @extends BasicResultModel
 */
export class BaseNumberResultModel extends BasicResultModel<number> { }

/**
 * Result is null.
 * @extends BasicResultModel
 */
export class BaseNullResultModel extends BasicResultModel<null> { }

/**
 * Base row event clicks in grids or tables.
 * Row is the selected line of the table.
 */
export class BaseRowEventModel {
  ActionIndex: number;
  Row: BaseTableModel;
}

/**
 * Base table for most tables in the system.
 * Instantiate this model to format table items.
 */
export class BaseTableModel {
  Id?: number;
  ApprovalFlowStatus?: number;
  ApprovalFlowStatusDescription?: string;
  ApprovalFlowStatusInt?: number;
  ApprovalSecurityGroups?: string[];
  EffectiveDate?: string;
  EndDate?: string;
  RegisterDate?: string;
  ApprovalDate?: string;
  EmployeeFunctionalRegister?: string;
  EmployeeFunctionalApproval?: string;
  Active?: boolean;
  ActiveDesc?: string;
  ActionComment?: string;
  OriginSubmittedApproval?: string;
  OriginPendingApproval?: string;

  constructor(attr: BaseTableModel = {}) {
    this.Id = attr.Id;
    this.EffectiveDate = formatDate(attr.EffectiveDate);
    this.EndDate = formatDate(attr.EndDate);
    this.RegisterDate = formateDateWithHour(attr.RegisterDate);
    this.ApprovalDate = formateDateWithHour(attr.ApprovalDate);
    this.ActionComment = attr.ActionComment;
    this.EmployeeFunctionalRegister = attr.EmployeeFunctionalRegister;
    this.EmployeeFunctionalApproval = attr.EmployeeFunctionalApproval;
    this.OriginSubmittedApproval = attr.OriginSubmittedApproval;
    this.OriginPendingApproval = attr.OriginPendingApproval;
    this.ActiveDesc = attr.Active !== null && Boolean(attr.Active) ? 'Sim' : 'Não';
    this.ApprovalFlowStatusDescription = attr.ApprovalFlowStatusDescription;
    this.ApprovalFlowStatusInt = attr.ApprovalFlowStatusInt;
  }
}
