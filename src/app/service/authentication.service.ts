import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          // Decode the token to get user information
          const decodedToken: any = jwtDecode(response.token);
          const userAux: User = {
            ...decodedToken,
            username: decodedToken['given_name'],
            userlogin: decodedToken['unique_name'],
            password: password,
            token: response.token,
          };
          // Store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(userAux));
          this.currentUserSubject.next(userAux);
          return userAux;
        })
      );
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
