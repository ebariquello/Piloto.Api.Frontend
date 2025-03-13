import { Component, OnInit } from '@angular/core';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';

import { UserService } from 'app/core/services/login/user.service';
import { LoginModel } from 'app/shared/models/login.model';
import { UserModel } from 'app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  isLoggedin: boolean = false;
  userInfo: UserModel = null;
  loginInfo: LoginModel = null;
  userInfoLoading: boolean = false;

  showSubMenus: boolean[] = [false, false];

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.currentLogin.subscribe(
      (login) => {
        this.isLoggedin = login && login.success;
        if (this.isLoggedin) {
          this.getUserInfo();
        }
      },
      (err) => this.toastr.error(err)
    );
  }

  logoutUser(): void {
    this.closeSubMenus();
    this.userService.logout();
    this.isLoggedin = false;
  }

  closeSubMenus(): void {
    this.showSubMenus.forEach(
      (subMenu, index) => (this.showSubMenus[index] = false)
    );
  }

  toggleSubMenu(index: number): void {
    if (this.showSubMenus[index] === false) {
      this.closeSubMenus();
      this.showSubMenus[index] = true;
    } else {
      this.closeSubMenus();
    }
  }

  private getUserInfo(): void {
    this.userInfoLoading = true;
    this.userService.currentUser.subscribe(
      (user) => {
        this.userInfoLoading = false;
        if (user) {
          this.userInfo = user;
          this.loginInfo = this.userService.currentLoginValue;
        }
      },
      (err) => checkErrorMessage(this.toastr, err)
    );
  }
}
