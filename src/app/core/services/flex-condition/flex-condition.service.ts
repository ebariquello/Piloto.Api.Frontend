import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment';
import { BaseNumberResultModel } from 'app/shared/models/base.model';
import {
  FlexConditionResultModel,
  FlexSelectResultModel,
  FormFlexConditionModel
} from 'app/core/services/flex-condition/flex-condition.model';

@Injectable({
  providedIn: 'root'
})
export class FlexConditionService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllFlexConditions(): Observable<FlexConditionResultModel> {
    return this.http.get<FlexConditionResultModel>(`${environment.flexConditions.queryAllConditions}`);
  }

  getPaymentProduct(): Observable<FlexSelectResultModel> {
    return this.http.get<FlexSelectResultModel>(`${environment.flexConditions.paymentProduct}`);
  }

  getModality(): Observable<FlexSelectResultModel> {
    return this.http.get<FlexSelectResultModel>(`${environment.flexConditions.modality}`);
  }

  addFlexTable(body: FormFlexConditionModel): Observable<BaseNumberResultModel> {
    return this.http.post<BaseNumberResultModel>(`${environment.flexConditions.addFlex}`, body);
  }
}
