// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs/internal/Observable';
// import { environment } from 'environments/environment';
// import { DetailBaseResultModel } from 'app/core/services/detail-flex-condition/detail-flex-condition.model';
// import { CompleteTaskEnum } from 'app/shared/enums/complete-task.enum';
// // import { DetailDiscountParameterResultModel } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class DetailDiscountParameterService {
//   constructor(private http: HttpClient) {}

//   getDetailsDiscountParameterTable(
//     id: number
//   ): Observable<DetailDiscountParameterResultModel> {
//     return this.http.get<DetailDiscountParameterResultModel>(
//       `${environment.parameters.details}${id}`
//     );
//   }

//   completeTaskDiscountParameter(
//     TableID: number,
//     Comment: string | null,
//     Action: CompleteTaskEnum
//   ): Observable<DetailBaseResultModel> {
//     return this.http.post<DetailBaseResultModel>(
//       `${environment.parameters.completeTask}`,
//       { TableID, Comment, Action }
//     );
//   }
// }
