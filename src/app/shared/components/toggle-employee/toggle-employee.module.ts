import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleEmployeeComponent } from './toggle-employee.component';
import { UserDetailModule } from 'app/shared/components/user-detail/user-detail.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
  declarations: [ToggleEmployeeComponent],
  imports: [
    CommonModule,
    UserDetailModule,
    NgxSmartModalModule.forChild(),
  ],
  exports: [ToggleEmployeeComponent]
})
export class ToggleEmployeeModule { }
