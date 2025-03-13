import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from 'app/modules/login/pages/login/login.component';
import { FormLoginComponent } from 'app/modules/login/components/form-login/form-login.component';


@NgModule({
  declarations: [
    LoginComponent,
    FormLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ToastrService,
  ]
})
export class LoginModule { }
