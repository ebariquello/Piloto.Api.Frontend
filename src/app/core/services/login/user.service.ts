import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'environments/environment';
import { LoginModel } from 'app/shared/models/login.model';
import { UserModel } from 'app/shared/models/user.model';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';
import { ToastrService } from 'ngx-toastr';

import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentLoginSubject = new BehaviorSubject<LoginModel>(null);
  currentLogin: Observable<LoginModel>;
  private currentUserSubject = new BehaviorSubject<UserModel>(null);
  currentUser: Observable<UserModel>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.currentLoginSubject = new BehaviorSubject<LoginModel>(
      JSON.parse(localStorage.getItem('login'))
    );
    this.currentLogin = this.currentLoginSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<UserModel>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentLoginValue(): LoginModel {
    return this.currentLoginSubject.value;
  }

  /**
   * Store user details and jwt token in local storage to keep user logged in between page refreshes
   * @param email
   * @param password
   * @returns `Observable<LoginModel>`
   */
  login(email: string, password: string): Observable<LoginModel> {
    return this.http
      .post<any>(`${environment.user.login}`, {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          const login: LoginModel = response;
          if (login && login.token) {
            login.success = true;
            this.saveLoginLocalStorage(login);
            const decode = jwtDecode(login.token);
            this.saveUserLocalStorage({
              name: decode['given_name'],
              id: decode['sub'],
              login: decode['unique_name'],
              email: decode['email'],
            } as UserModel);
          }

          return login;
        }),
        catchError((error) => {
          checkErrorMessage(this.toastr, error);
          throw error;
        })
      );
  }

  /**
   * Returns logged user information, like name and functional
   */
  get currentUserInformation(): UserModel {
    return this.currentUserSubject.value;
  }

  /**
   * Remove user from local storage to log user out and return to login page
   */
  logout(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    this.currentLoginSubject.next(null);
    this.currentLogin = this.currentLoginSubject.asObservable();
    this.currentUserSubject.next(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.router.navigate(['login']);
  }

  /**
   * Saves token in local storage
   * @param loginModel
   */
  private saveLoginLocalStorage(login: LoginModel) {
    localStorage.setItem('login', JSON.stringify(login));
    this.currentLoginSubject.next(login);
    this.currentLogin = this.currentLoginSubject.asObservable();
  }
  private saveUserLocalStorage(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }
}
