import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/core/services/login/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  loading: boolean;

  formLogin: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  sendForm(): void {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.valid) {
      this.logUser();
    } else {
      this.toastr.error('Fill required fields');
    }
  }

  private logUser(): void {
    this.loading = true;
    this.userService
      .login(
        this.formLogin.get('email').value,
        this.formLogin.get('password').value
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (response) => {
          if (response.success) {
            this.router.navigate(['workflow']);
          }
        },
        (err) => this.toastr.error(err)
      );
  }

  private buildForm(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
