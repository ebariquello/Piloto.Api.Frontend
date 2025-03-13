import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexConditionRoutingModule } from './flex-condition-routing.module';
import { FlexConditionComponent } from './pages/flex-condition/flex-condition.component';
import { RouterModule } from '@angular/router';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { TableModule } from 'app/shared/components/table/table.module';
import { ToastrService } from 'ngx-toastr';
import { FlexConditionService } from 'app/core/services/flex-condition/flex-condition.service';
import { DetailFlexConditionComponent } from './pages/detail-flex-condition/detail-flex-condition.component';
import { ToggleEmployeeModule } from 'app/shared/components/toggle-employee/toggle-employee.module';
import { CommentFormModule } from 'app/shared/components/comment-form/comment-form.module';
import { CreateFlexConditionComponent } from './pages/create-flex-condition/create-flex-condition.component';
import { FormCreateFlexConditionComponent } from './components/form-create-flex-condition/form-create-flex-condition.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FlexConditionComponent,
    DetailFlexConditionComponent,
    CreateFlexConditionComponent,
    FormCreateFlexConditionComponent,
  ],
  imports: [
    CommonModule,
    FlexConditionRoutingModule,
    RouterModule,
    GridModule,
    TableModule,
    ToggleEmployeeModule,
    CommentFormModule,
    ReactiveFormsModule,
  ],
  providers: [
    ToastrService,
    FlexConditionService
  ]
})
export class FlexConditionModule { }
