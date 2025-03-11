// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// const PROTOCOL = 'http';
// const PORT = '3500';

// @Injectable()
// export class RestUserRepository {
//   baseURL: string = '';
//   auth_token: string = '';

//   constructor(private http: HttpClient) {
//     this.baseURL = `${PROTOCOL}://${location.hostname}:${PORT}`;
//   }

//   authenticate(userName: string, pass: string): Observable<boolean> {
//     return this.http
//       .post<any>(`${this.baseURL}/login`, {
//         name: userName,
//         password: pass,
//       })
//       .pipe<boolean>(
//         map((resp) => {
//           this.auth_token = resp.success ? resp.token : null;
//           return resp.success;
//         })
//       );
//   }
// }
