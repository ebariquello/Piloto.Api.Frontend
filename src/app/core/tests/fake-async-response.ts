// @ts-ignore
import { throwError as _throw, scheduled } from 'rxjs';
import { async as _async } from 'rxjs/internal/scheduler/async';

export const fakeAsyncResponse = <T>(data?: T) => scheduled([data], _async);

export const fakeAsyncError = <T>(reason: T) => _throw(reason, _async);
