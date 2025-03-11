import { AuthenticationService } from '../../service/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public userName: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {}

  authenticate(form: NgForm) {
    if (form.valid) {
      // perform authentication
      this.authService
        .login(this.userName, this.password)
        .subscribe((user) => {
          if (user !== null && user.success) {
            this.router.navigateByUrl('/admin/main');
          }
          else{
          this.errorMessage = 'Auth failed';
          }
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
