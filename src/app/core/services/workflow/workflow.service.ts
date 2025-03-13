
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment';
import { WorkflowResultModel } from 'app/core/services/workflow/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(
    private http: HttpClient,
  ) { }

  getWorkflowPending(): Observable<WorkflowResultModel> {
    return this.http.get<WorkflowResultModel>(`${environment.workflows.pending}`);
  }

  getWorkflowSubmitted(): Observable<WorkflowResultModel> {
    return this.http.get<WorkflowResultModel>(`${environment.workflows.submitted}`);
  }
}
