import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment';
import { DetailBaseResultModel } from 'app/core/services/detail-flex-condition/detail-flex-condition.model';
import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';

@Injectable({
  providedIn: 'root'
})
export class DetailFlexConditionService {

  constructor(
    private http: HttpClient,
  ) { }

  getDetailsFlexConditionTable(id: number): Observable<DetailBaseResultModel> {
    return this.http.get<DetailBaseResultModel>(`${environment.flexConditions.details}${id}`);
  }

  completeTaskFlexCondition(TableID: number, Comment: string | null, Action: CompleteTaskEnum): Observable<DetailBaseResultModel> {
    return this.http.post<DetailBaseResultModel>(`${environment.flexConditions.completeTask}`, { TableID, Comment, Action });
  }
}
