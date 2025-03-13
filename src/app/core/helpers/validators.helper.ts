import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * FinalBilling cannot be bigger than InitialBilling
 * @param form FormGroup
 */
export function billingValidator(form: FormGroup): ValidationErrors | null {
  if (+form.get('FinalBilling').value <= +form.get('InitialBilling').value) {
    return { billingValidator: true };
  }
  return null;
}

/**
 * Minimum date must be tomorrow or after
 * @param dateControl FormControl
 */
export function minDateTomorrowValidator(dateControl: FormControl): ValidationErrors | null {
  const datePicked = new Date(dateControl.value);
  const dateToday = new Date();

  if (datePicked <= dateToday) {
    return { minDateTomorrowValidator: true };
  }
  return null;
}

/**
 * EndDate must be after the EffectiveDate
 * @param form FormGroup
 */
export function finalDateValidator(form: FormGroup): ValidationErrors | null {
  const initialDate = new Date(form.get('EffectiveDate').value);
  const finalDate = new Date(form.get('EndDate').value);

  if (finalDate <= initialDate) {
    return { finalDateValidator: true };
  }
  return null;
}

/**
 * Value must be greater than zero
 * @param value numeric FormControl
 */
export function greaterThanZero(value: FormControl): ValidationErrors | null {
  if (Number(value.value) <= 0) {
    return { greaterThanZero: true };
  }
  return null;
}
