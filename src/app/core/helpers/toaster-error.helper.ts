import { ErrorDetailModel } from 'app/shared/models/base.model';
import { ToastrService } from 'ngx-toastr';

/**
 * Checks if this endpoints returned an error.
 *
 * If an error is returned from the server, a red toaster with status + title of the error
 * will be shown.
 *
 * @param toastr ToastrService
 * @param errorDetail Response.ErrorDetail
 */
export function checkErrorMessage(toastr: ToastrService, errorDetail: ErrorDetailModel): void {
  if (errorDetail) {
    const messageBody = displayMessages(errorDetail);
    toastr.error(messageBody, `(${errorDetail.Status}) ${errorDetail.Title}`);
  }
}

function displayMessages(errorDetail: ErrorDetailModel): string {
  if (errorDetail.Details && errorDetail.Details.length > 0) {
    const messageString = [];
    errorDetail.Details.forEach(
      detail => messageString.push(detail.Message)
    );

    return messageString.join('; ');
  }

  return '';
}
